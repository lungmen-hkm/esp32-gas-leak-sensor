"use client";

import { useEffect, useState } from "react";
import ThemeToggle from "./theme-toggle";

interface DeviceNode {
  device_id: string;
  is_online: boolean;
  gas_raw: number;
  threshold: number;
  updated_at: string;
}

interface ApiResponse {
  total_nodes: number;
  devices: DeviceNode[];
}

const GITHUB_REPO = "https://github.com/lungmen-hkm/sensoritulahpokoknya";
const PORTFOLIO_URL = "https://www.lungmenhkm.xyz";

function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M16 13L16 15L18 15L18 13L20 13L20 11L18 11L18 9L16 9L16 11L4 11L4 13L16 13ZM16 9L16 7L14 7L14 9L16 9ZM16 17L16 15L14 15L14 17L16 17ZM12 7L14 7L14 5L12 5L12 7ZM14 19L14 17L12 17L12 19L14 19Z" />
    </svg>
  );
}

function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 8 8"
      fill="currentColor"
      shapeRendering="crispEdges"
      aria-hidden="true"
      className={className}
    >
      <rect x="1" y="1" width="2" height="6" />
      <rect x="1" y="5" width="6" height="2" />
    </svg>
  );
}

function DeviceCard({
  node,
  black,
}: {
  node: DeviceNode;
  black: boolean;
}) {
  const isOnline = node.is_online;
  const isDanger = isOnline && node.gas_raw > node.threshold;
  const limit = Math.max(node.threshold, 1);
  const percentage = Math.max(
    0,
    Math.round((node.gas_raw / limit) * 100)
  );
  const barPercentage = Math.min(100, percentage);

  const muted = black
    ? "text-white/50"
    : "text-black/50 dark:text-white/50";
  const footerMuted = black
    ? "text-white/45"
    : "text-black/45 dark:text-white/45";
  const divider = black
    ? "border-white/15"
    : "border-black/10 dark:border-white/10";
  const track = black
    ? "bg-white/15"
    : "bg-black/10 dark:bg-white/10";
  const pillBorder = black
    ? "border-white/25"
    : "border-black/15 dark:border-white/20";
  const titleColor = !isOnline
    ? black
      ? "text-white/60"
      : "text-black/60 dark:text-white/60"
    : "";

  const valueColor = !isOnline
    ? black
      ? "text-white/35"
      : "text-black/35 dark:text-white/35"
    : isDanger
    ? black
      ? "text-rose-400"
      : "text-rose-600 dark:text-rose-400"
    : black
    ? "text-accent"
    : "text-black dark:text-white";

  const statusClass = !isOnline
    ? black
      ? "border-dashed border-white/15 bg-white/5 text-white/45"
      : "border-dashed border-black/10 bg-black/5 text-black/45 dark:border-white/15 dark:bg-white/5 dark:text-white/45"
    : isDanger
    ? [
        "border-rose-500/40 bg-rose-500/10",
        black ? "text-rose-400" : "text-rose-600 dark:text-rose-400",
        "animate-pulse",
      ].join(" ")
    : [
        "border-accent/40 bg-accent/10",
        black ? "text-accent" : "text-black dark:text-accent",
      ].join(" ");

  const statusLabel = !isOnline
    ? "No signal"
    : isDanger
    ? "Diatas Batas Aman"
    : "Dibawah Batas Aman";

  return (
    <article
      className={[
        "group flex min-h-[340px] flex-col justify-between p-6 transition-[padding] duration-300 hover:pt-8",
        black
          ? "bg-black text-white"
          : "bg-white text-black dark:bg-[#171717] dark:text-white",
        isDanger
          ? "ring-2 ring-rose-500/70 shadow-2xl shadow-rose-500/10 dark:ring-2 dark:ring-rose-500/60"
          : "dark:ring-1 dark:ring-white/10",
      ].join(" ")}
    >
      <div>
        <div className="flex items-start justify-between gap-4">
          <p
            className={`pt-1 font-mono text-[10px] font-bold uppercase tracking-[0.16em] ${muted}`}
          >
            Sensor node
          </p>

          <span
            className={[
              "inline-flex shrink-0 items-center gap-1.5 border px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.1em]",
              pillBorder,
              isOnline
                ? black
                  ? "text-accent"
                  : "text-black dark:text-white"
                : black
                ? "text-white/45"
                : "text-black/45 dark:text-white/45",
            ].join(" ")}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                isOnline ? "animate-pulse bg-accent" : "bg-current"
              }`}
            />
            {isOnline ? "Online" : "Offline"}
          </span>
        </div>

        <h2
          className={`mt-2 break-words font-mono text-[18px] font-bold uppercase leading-[1.15] tracking-[0.01em] md:text-[20px] ${titleColor}`}
        >
          {node.device_id}
        </h2>

        <div className="mt-8">
          <div className="flex items-end gap-3">
            <span
              className={`font-mono text-[clamp(48px,6vw,60px)] font-bold leading-none tracking-[-0.04em] ${valueColor}`}
            >
              {node.gas_raw}
            </span>
            <span
              className={`pb-1 font-mono text-[10px] uppercase leading-[1.35] tracking-[0.12em] ${muted}`}
            >
              Analog
              <br />
              raw value
            </span>
          </div>

          <div
            className={`mt-5 flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.1em] ${muted}`}
          >
            <span>Signal level</span>
            <span
              className={
                isDanger
                  ? black
                    ? "text-rose-400"
                    : "text-rose-600 dark:text-rose-400"
                  : undefined
              }
            >
              {percentage}% of limit
            </span>
          </div>

          <div
            role="progressbar"
            aria-label={`${node.device_id} gas level`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={barPercentage}
            aria-valuetext={`${percentage}% of limit`}
            className={`mt-2 h-1.5 w-full overflow-hidden ${track}`}
          >
            <div
              className={`h-full transition-[width] duration-500 ${
                !isOnline
                  ? black
                    ? "bg-white/25"
                    : "bg-black/25 dark:bg-white/25"
                  : isDanger
                  ? "bg-rose-500"
                  : "bg-accent"
              }`}
              style={{ width: `${barPercentage}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div
          className={[
            "w-full border px-3 py-2.5 text-center font-mono text-[10px] font-bold uppercase tracking-[0.12em]",
            statusClass,
          ].join(" ")}
        >
          {statusLabel}
        </div>

        <div
          className={`mt-4 flex items-center justify-between gap-3 border-t pt-4 font-mono text-[10px] uppercase tracking-[0.1em] ${divider} ${footerMuted}`}
        >
          <span>Limit: {node.threshold}</span>
          <span className="whitespace-nowrap">{node.updated_at}</span>
        </div>
      </div>
    </article>
  );
}

export default function Dashboard() {
  const [nodes, setNodes] = useState<DeviceNode[]>([]);
  const [totalNodes, setTotalNodes] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch(
          "https://project.lungmenhkm.xyz/roboci/api/gas-sensor"
        );
        const json: ApiResponse = await res.json();
        if (json.devices) {
          setNodes(json.devices);
          setTotalNodes(json.total_nodes);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const activeNodeCount = nodes.filter((node) => node.is_online).length;

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto flex h-[70px] w-full max-w-[1200px] items-center justify-between gap-4 border-b border-transparent bg-black px-4 dark:border-white/10 sm:px-6">
          <div className="flex min-w-0 items-center gap-7">
            <a
              href="#top"
              aria-label="Gas monitoring dashboard — back to top"
              className="flex shrink-0 items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              <span className="flex h-12 w-12 items-center justify-center bg-accent">
                <LogoMark className="h-6 w-6 text-black" />
              </span>
              <span className="hidden text-[21px] font-bold tracking-[-0.03em] text-white min-[360px]:inline">
                lungmen<span className="text-accent">.hkm</span>
              </span>
            </a>

            <nav
              aria-label="Primary"
              className="hidden items-center gap-5 lg:flex"
            >
            </nav>
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-5">
            <ThemeToggle />
            <a
              href={GITHUB_REPO}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-accent py-1.5 pl-1.5 pr-4 font-mono text-[11px] font-bold uppercase tracking-[0.06em] text-black transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <ArrowIcon className="h-5 w-5" />
              GitHub
            </a>
          </div>
        </div>
      </header>

      <main id="top" className="flex-1 pt-[70px]">
        <section className="mx-auto w-full max-w-[1200px] px-4 sm:px-6">
          <div className="flex flex-col gap-8 pb-10 pt-12 lg:flex-row lg:items-end lg:justify-between lg:pb-12 lg:pt-16">
            <div>
              <p className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-black/60 dark:text-white/60">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                {nodes.length > 0 ? "Receiving data..." : "Waiting for data..."}
              </p>
              <h1 className="mt-4 text-[clamp(38px,4.4vw,64px)] font-semibold uppercase leading-[1.02] tracking-[0.015em]">
                Gas Monitoring
              </h1>
            </div>

            <div className="flex flex-col items-start gap-4 lg:items-end">
              <p className="max-w-md text-[14px] leading-relaxed text-black/60 dark:text-white/60 lg:text-right">
                Real-time telemetry from ESP32-C3 gas sensor nodes. Readings
                refresh automatically every second.
              </p>

              <div className="flex min-w-[150px] items-center gap-4 border border-black/15 bg-white px-4 py-3 dark:border-white/15 dark:bg-[#171717]">
                <span className="h-2 w-2 shrink-0 bg-accent" />
                <div>
                  <p className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-black/50 dark:text-white/50">
                    Active nodes
                  </p>
                  <p className="font-mono text-[22px] font-bold leading-none">
                    {activeNodeCount}
                    <span className="ml-1.5 text-[10px] font-medium text-black/40 dark:text-white/40">
                      / {totalNodes}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div id="dashboard" className="scroll-mt-24 pb-20 lg:pb-24">
            {nodes.length === 0 ? (
              <div className="flex min-h-[350px] flex-col items-center justify-center gap-5 bg-white p-8 text-center dark:bg-[#171717] dark:ring-1 dark:ring-white/10">
                <span className="flex h-12 w-12 items-center justify-center border border-black/15 dark:border-white/15">
                  <span className="h-2.5 w-2.5 animate-pulse bg-accent" />
                </span>
                <p className="font-mono text-sm uppercase tracking-widest text-black/60 dark:text-white/60">
                  Belum ada data sensor terdeteksi...
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                {nodes.map((node, index) => (
                  <DeviceCard
                    key={node.device_id}
                    node={node}
                    black={index % 2 === 0}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
