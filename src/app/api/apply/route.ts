import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";
import { getSupabaseClient } from "@/lib/supabaseClient";

const STAGES = ["WRITING", "RECORDING", "RELEASED", "TOURING"] as const;
const CURRENT_ELEMENT = process.env.NEXT_PUBLIC_CURRENT_ELEMENT || "studios";

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;",
    };
    return entities[character];
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const artistName = typeof body.artistName === "string" ? body.artistName.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    const genre = typeof body.genre === "string" ? body.genre.trim() : "";
    const stage = typeof body.stage === "string" ? body.stage : "";
    const portfolioPrimary = typeof body.portfolioPrimary === "string" ? body.portfolioPrimary.trim() : "";
    const portfolioSecondary = typeof body.portfolioSecondary === "string" ? body.portfolioSecondary.trim() : "";
    const rawServices = Array.isArray(body.servicesNeeded) ? (body.servicesNeeded as unknown[]) : [];
    const servicesNeeded = rawServices.filter((item): item is string => typeof item === "string").slice(0, 12);
    const whatBuilding = typeof body.whatBuilding === "string" ? body.whatBuilding.trim() : "";
    const whyStudios = typeof body.whyStudios === "string" ? body.whyStudios.trim() : "";
    const retainsIP = typeof body.retainsIP === "boolean" ? body.retainsIP : null;
    const consent = body.consent === true;
    const website = typeof body.website === "string" ? body.website.trim() : "";

    if (website) {
      return NextResponse.json({ error: "Unable to submit application" }, { status: 400 });
    }

    if (
      !artistName ||
      !email ||
      !genre ||
      !portfolioPrimary ||
      !whatBuilding ||
      !consent ||
      !STAGES.includes(stage as (typeof STAGES)[number])
    ) {
      return NextResponse.json({ error: "Missing or invalid required fields" }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || whatBuilding.length > 500 || whyStudios.length > 300) {
      return NextResponse.json({ error: "Invalid application data" }, { status: 400 });
    }

    const portfolioUrls = [portfolioPrimary, portfolioSecondary].filter(Boolean);
    const supabase = getSupabaseClient();
    let applicationId: string | null;

    if (supabase) {
      const { error } = await supabase
        .from("applications")
        .insert({
          element: CURRENT_ELEMENT,
          artist_name: artistName,
          email,
          phone: phone || null,
          genre,
          stage,
          portfolio_urls: portfolioUrls,
          services_needed: servicesNeeded,
          what_they_build: whatBuilding,
          why_studios: whyStudios || null,
          retains_ip: retainsIP === true ? "Yes" : retainsIP === false ? "No" : "Unsure",
          consent: true,
          status: "PENDING",
        })
        ;

      if (error) {
        console.error("Supabase application insert error:", error);
        return NextResponse.json({ error: "Unable to save application" }, { status: 500 });
      }

      applicationId = null;
    } else {
      const application = await prisma.application.create({
        data: {
          artistName,
          email,
          phone: phone || null,
          genre,
          stage: stage as (typeof STAGES)[number],
          portfolioUrls,
          servicesNeeded,
          whatTheyBuild: whatBuilding,
          whyStudios: whyStudios || null,
          retainsIP,
          consent: true,
          status: "PENDING",
        },
      });
      applicationId = application.id;
    }

    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const safeArtistName = escapeHtml(artistName);
      const safeEmail = escapeHtml(email);

      try {
        await resend.emails.send({
          from: "Whole Body Studios <onboarding@resend.dev>",
          to: [email],
          subject: "Application Received — Whole Body Studios",
          html: `<div style="font-family:monospace;background:#050505;color:#EDEDED;padding:2rem;max-width:600px"><h1 style="color:#2BA8A0">Application Received</h1><p>Thank you for applying to Whole Body Studios.</p><p style="color:#8888A0">We review every submission within 14 days. If your work carries the frequency, we’ll reach out with a link for a discovery call.</p><hr style="border:none;border-top:1px solid #2A2A38;margin:1.5rem 0"><p style="color:#2BA8A0">● The artist eats first. Always.</p></div>`,
        });

        if (process.env.ADMIN_EMAIL) {
          await resend.emails.send({
            from: "Whole Body Studios <onboarding@resend.dev>",
            to: [process.env.ADMIN_EMAIL],
            subject: `New Application: ${artistName}`,
            html: `<div style="font-family:monospace;background:#050505;color:#EDEDED;padding:2rem;max-width:600px"><h1 style="color:#2BA8A0">New Partnership Application</h1><p><strong>Artist:</strong> ${safeArtistName}</p><p><strong>Email:</strong> ${safeEmail}</p><p><strong>Genre:</strong> ${escapeHtml(genre)}</p><p><strong>Stage:</strong> ${escapeHtml(stage)}</p><p><strong>Services:</strong> ${servicesNeeded.map(escapeHtml).join(", ") || "None selected"}</p></div>`,
          });
        }
      } catch (emailError) {
        console.error("Application saved but email delivery failed:", emailError);
      }
    }

    return NextResponse.json({
      success: true,
      applicationId,
      message: "Application submitted successfully",
    });
  } catch (error) {
    console.error("Application submission error:", error);
    return NextResponse.json({ error: "Unable to submit application" }, { status: 500 });
  }
}

export function GET() {
  return NextResponse.json({ endpoint: "POST /api/apply", methods: ["POST"], status: "operational" });
}
