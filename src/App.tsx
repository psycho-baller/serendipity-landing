import { useMemo, useState } from "react";

import { DashboardExperience } from "./components/DashboardExperience";
import { InlineWaitlistForm } from "./components/InlineWaitlistForm";
import { useEventData } from "./hooks/useEventData";

export default function App() {
  const { data } = useEventData();
  const [showDashboard, setShowDashboard] = useState(false);

  const momentumStats = useMemo(() => {
    const events = data.days.flatMap((day) => day.events);
    const highSerendipity = events.filter((event) => event.serendipity.score >= 70).length;
    const warmIntros = events.reduce((sum, event) => sum + event.serendipity.warm_connections.length, 0);

    return {
      eventsWithSignal: highSerendipity,
      warmIntroMoments: warmIntros,
    };
  }, [data.days]);

  if (showDashboard) {
    return <DashboardExperience />;
  }

  return (
    <div className="landing-shell">
      <header className="landing-header">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--color-accent-400)] text-[var(--color-surface-950)]">
              <span className="font-semibold tracking-tight">S</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--color-text-primary)]">Serendipity</p>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                Toronto Tech Week Intelligence
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowDashboard(true)}
            className="rounded-xl border border-[var(--color-surface-700)] px-4 py-2 text-sm font-medium text-[var(--color-text-primary)] transition-colors hover:border-[var(--color-accent-400)] hover:text-[var(--color-accent-400)]"
          >
            open live demo
          </button>
        </div>
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-glow" aria-hidden />
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 pt-28 pb-20 md:grid-cols-[1.05fr_0.95fr] md:pt-36">
            <div className="space-y-8">
              <p className="inline-flex rounded-full border border-[var(--color-surface-700)] bg-black/25 px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-accent-400)]">
                project serendipity
              </p>
              <h1 className="max-w-3xl text-5xl leading-[0.92] font-semibold tracking-[-0.04em] text-[var(--color-text-primary)] md:text-7xl">
                walk into Toronto Tech Week already knowing who matters.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-[var(--color-text-secondary)]">
                Serendipity turns chaotic event guest lists into a relationship strategy: who to prioritize, who can
                introduce you, and which rooms are worth your time.
              </p>
              <InlineWaitlistForm align="left" caption="Join early to test Serendipity before general release." />
            </div>

            <div className="landing-card space-y-6">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--color-accent-400)]">
                what the dashboard surfaces
              </p>
              <div className="grid grid-cols-2 gap-4">
                <article className="stat-card">
                  <p className="text-sm text-[var(--color-text-muted)]">events mapped</p>
                  <p className="mt-2 text-3xl font-semibold text-[var(--color-text-primary)]">{data.stats.total_events}</p>
                </article>
                <article className="stat-card">
                  <p className="text-sm text-[var(--color-text-muted)]">unique guests</p>
                  <p className="mt-2 text-3xl font-semibold text-[var(--color-text-primary)]">
                    {data.stats.total_unique_guests.toLocaleString()}
                  </p>
                </article>
                <article className="stat-card">
                  <p className="text-sm text-[var(--color-text-muted)]">high-signal events</p>
                  <p className="mt-2 text-3xl font-semibold text-[var(--color-text-primary)]">{momentumStats.eventsWithSignal}</p>
                </article>
                <article className="stat-card">
                  <p className="text-sm text-[var(--color-text-muted)]">warm intro paths</p>
                  <p className="mt-2 text-3xl font-semibold text-[var(--color-text-primary)]">{momentumStats.warmIntroMoments}</p>
                </article>
              </div>
              <button
                onClick={() => setShowDashboard(true)}
                className="w-full rounded-xl bg-[var(--color-accent-400)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-[var(--color-surface-950)] transition-colors hover:bg-[var(--color-accent-500)]"
              >
                launch interactive dashboard
              </button>
            </div>
          </div>
        </section>

        <section className="mx-auto grid w-full max-w-6xl gap-4 px-6 pb-18 md:grid-cols-3">
          <article className="value-card">
            <p className="value-kicker">signal-first scoring</p>
            <h3>Know which events are worth your evening.</h3>
            <p>
              Each event gets a Serendipity score built from warm connections, super-connectors, and list quality.
            </p>
          </article>
          <article className="value-card">
            <p className="value-kicker">relationship context</p>
            <h3>Show up with context, not guesswork.</h3>
            <p>
              Pull attendee profiles, conversation recency, and role context so every introduction is intentional.
            </p>
          </article>
          <article className="value-card">
            <p className="value-kicker">schedule control</p>
            <h3>See conflicts before they cost momentum.</h3>
            <p>
              Compare overlapping sessions and build a realistic plan that protects your highest-leverage meetings.
            </p>
          </article>
        </section>
      </main>
    </div>
  );
}
