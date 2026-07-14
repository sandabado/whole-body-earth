"use client";

import { useState, type FormEvent } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

type RetainsIP = "yes" | "no" | "unsure" | "";

type FormState = {
  artistName: string;
  email: string;
  phone: string;
  genre: string;
  stage: string;
  portfolioPrimary: string;
  portfolioSecondary: string;
  servicesNeeded: string[];
  whatBuilding: string;
  whyStudios: string;
  retainsIP: RetainsIP;
  consent: boolean;
  website: string;
};

const INITIAL_STATE: FormState = {
  artistName: "", email: "", phone: "", genre: "", stage: "WRITING", portfolioPrimary: "", portfolioSecondary: "", servicesNeeded: [], whatBuilding: "", whyStudios: "", retainsIP: "", consent: false, website: "",
};

const STAGES = ["WRITING", "RECORDING", "RELEASED", "TOURING"];
const SERVICES_LIST = ["Production / Recording", "Mixing / Mastering", "Distribution", "Sync Licensing", "Artist Development", "Film Scoring"];

export default function ApplyPage() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState | "submission", string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    setForm((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => ({ ...previous, [field]: undefined, submission: undefined }));
  };

  const toggleService = (service: string) => handleChange(
    "servicesNeeded",
    form.servicesNeeded.includes(service) ? form.servicesNeeded.filter((item) => item !== service) : [...form.servicesNeeded, service],
  );

  const validate = () => {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    if (!form.artistName.trim()) nextErrors.artistName = "Artist name is required";
    if (!form.email.trim()) nextErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = "Enter a valid email";
    if (!form.genre.trim()) nextErrors.genre = "Genre is required";
    if (!form.portfolioPrimary.trim()) nextErrors.portfolioPrimary = "A primary portfolio link is required";
    if (!form.whatBuilding.trim()) nextErrors.whatBuilding = "Tell us what you are building";
    if (!form.consent) nextErrors.consent = "Consent is required to submit";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          retainsIP: form.retainsIP === "yes" ? true : form.retainsIP === "no" ? false : null,
        }),
      });
      if (!response.ok) throw new Error("Submission failed");
      setSubmitted(true);
      setForm(INITIAL_STATE);
    } catch {
      setErrors({ submission: "Something went wrong. Please try again or email us directly." });
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-6 py-20">
        <Card className="w-full max-w-md space-y-6 text-center">
          <div className="text-6xl">🍀</div>
          <h1 className="font-display text-3xl font-bold text-plasma">Application Received</h1>
          <p className="leading-relaxed text-ghost">We review every submission within 14 days. If your work carries the frequency, we’ll reach out with a link for a discovery call.</p>
          <Button asChild><a href="/">Return Home</a></Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="pb-20">
      <section className="border-b border-mercury px-6 pt-12 pb-16">
        <div className="mx-auto max-w-[1200px] text-center">
          <Badge variant="success" pulse className="mb-6">OPEN FOR PARTNERSHIPS</Badge>
          <h1 className="mb-6 font-display text-4xl font-bold md:text-6xl">Apply for<br /><span className="text-plasma">Partnership</span></h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-ghost">Tell us about your work. If it aligns with the frequency, we’ll invite you for a discovery call. No pressure. No contracts. Just conversation.</p>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-[800px]">
          <form onSubmit={handleSubmit} className="space-y-12" noValidate>
            <input
              type="text"
              name="website"
              value={form.website}
              onChange={(event) => handleChange("website", event.target.value)}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />
            <Card hud={false}>
              <h2 className="mb-6 flex items-center gap-2 font-display text-xl font-bold"><span className="text-plasma">01</span> Basic Information</h2>
              <div className="grid gap-6 md:grid-cols-2">
                <Input label="Artist Name" value={form.artistName} onChange={(event) => handleChange("artistName", event.target.value)} error={errors.artistName} placeholder="Stage name or real name" autoComplete="name" />
                <Input label="Email" type="email" value={form.email} onChange={(event) => handleChange("email", event.target.value)} error={errors.email} placeholder="you@example.com" autoComplete="email" />
                <Input label="Phone (optional)" type="tel" value={form.phone} onChange={(event) => handleChange("phone", event.target.value)} placeholder="+1 (555) 000-0000" autoComplete="tel" />
                <Input label="Genre" value={form.genre} onChange={(event) => handleChange("genre", event.target.value)} error={errors.genre} placeholder="Electronic, hip-hop, ambient, etc." />
              </div>
            </Card>

            <Card hud={false}>
              <h2 className="mb-6 flex items-center gap-2 font-display text-xl font-bold"><span className="text-plasma">02</span> Current Stage</h2>
              <div className="flex flex-wrap gap-3">{STAGES.map((stage) => <button key={stage} type="button" onClick={() => handleChange("stage", stage)} className={`rounded-[2px] px-4 py-2 font-mono text-sm transition-colors ${form.stage === stage ? "bg-plasma text-void" : "bg-mercury/20 text-ghost hover:text-bone"}`}>{stage.charAt(0) + stage.slice(1).toLowerCase()}</button>)}</div>
              <p className="mt-3 text-xs text-ghost">Select where you are in your creative journey.</p>
            </Card>

            <Card hud={false}>
              <h2 className="mb-6 flex items-center gap-2 font-display text-xl font-bold"><span className="text-plasma">03</span> Portfolio</h2>
              <div className="space-y-4"><Input label="Primary Portfolio Link (required)" value={form.portfolioPrimary} onChange={(event) => handleChange("portfolioPrimary", event.target.value)} error={errors.portfolioPrimary} placeholder="spotify.com/artist/... or bandcamp.com/..." inputMode="url" /><Input label="Secondary Link (optional)" value={form.portfolioSecondary} onChange={(event) => handleChange("portfolioSecondary", event.target.value)} placeholder="instagram.com/... or youtube.com/..." inputMode="url" /></div>
            </Card>

            <Card id="services-needed" hud={false}>
              <h2 className="mb-6 flex items-center gap-2 font-display text-xl font-bold"><span className="text-plasma">04</span> What Do You Need?</h2>
              <p className="mb-4 text-sm text-ghost">Select all that apply:</p>
              <div className="grid gap-3 md:grid-cols-2">{SERVICES_LIST.map((service) => <label key={service} className={`flex cursor-pointer items-center gap-3 rounded-[2px] border p-3 transition-colors ${form.servicesNeeded.includes(service) ? "border-plasma bg-plasma/10" : "border-mercury bg-mercury/20 hover:border-plasma"}`}><input type="checkbox" checked={form.servicesNeeded.includes(service)} onChange={() => toggleService(service)} className="h-4 w-4 accent-plasma" /><span className="font-mono text-sm text-bone">{service}</span></label>)}</div>
            </Card>

            <Card hud={false}>
              <h2 className="mb-6 flex items-center gap-2 font-display text-xl font-bold"><span className="text-plasma">05</span> Vision</h2>
              <Textarea label="What are you building? (500 characters max)" value={form.whatBuilding} onChange={(event) => handleChange("whatBuilding", event.target.value)} error={errors.whatBuilding} maxLength={500} placeholder="Describe your artistic vision, goals, and what you’re working toward..." />
              <p className="mt-2 text-right text-xs text-ghost">{form.whatBuilding.length}/500</p>
            </Card>

            <Card hud={false}>
              <h2 className="mb-6 flex items-center gap-2 font-display text-xl font-bold"><span className="text-plasma">06</span> Alignment</h2>
              <Textarea label="Why Whole Body Studios? (300 characters max)" value={form.whyStudios} onChange={(event) => handleChange("whyStudios", event.target.value)} maxLength={300} placeholder="What draws you to the Feed First model? Why this approach?" />
              <p className="mt-2 text-right text-xs text-ghost">{form.whyStudios.length}/300</p>
            </Card>

            <Card hud={false} className="bg-carbon/50">
              <h2 className="mb-6 flex items-center gap-2 font-display text-xl font-bold"><span className="text-plasma">07</span> Agreement</h2>
              <div className="space-y-4">
                <div className="space-y-3">{[["yes", "Yes, I currently retain my masters/IP", "This is aligned with our model"], ["no", "No, I don’t currently retain my masters", "We can discuss buyouts or reversion"], ["unsure", "Unsure", "We can clarify during discovery"]].map(([value, title, description]) => <label key={value} className="flex cursor-pointer items-start gap-3"><input type="radio" name="retainsIP" value={value} checked={form.retainsIP === value} onChange={() => handleChange("retainsIP", value as RetainsIP)} className="mt-1 accent-plasma" /><span><span className="block font-semibold text-bone">{title}</span><span className="text-sm text-ghost">{description}</span></span></label>)}</div>
                <label className={`flex cursor-pointer items-start gap-3 rounded-[2px] border p-4 ${errors.consent ? "border-red-500 bg-red-500/10" : "border-mercury bg-mercury/20"}`}><input type="checkbox" checked={form.consent} onChange={(event) => handleChange("consent", event.target.checked)} className="mt-1 h-4 w-4 accent-plasma" /><span className="text-sm text-ghost">I understand Whole Body Studios operates on the Feed First model. Artists retain 100% IP. We earn on services rendered, not ownership.<span className="mt-1 block">I agree to be contacted regarding partnership opportunities.</span></span></label>
              </div>
            </Card>

            {errors.submission && <p role="alert" className="rounded-[2px] border border-red-500 bg-red-500/10 p-4 text-center text-sm text-red-300">{errors.submission}</p>}
            <Button type="submit" size="lg" className="w-full" disabled={submitting || !form.consent}>{submitting ? "Submitting..." : "Submit Application →"}</Button>
          </form>
        </div>
      </section>
    </div>
  );
}
