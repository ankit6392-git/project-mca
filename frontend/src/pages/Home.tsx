import { useEffect, useState } from "react";
import Header from "../components/common/Header";
import Hero from "../components/layouts/Hero";
import { api } from "../services/api";

/* ================= COUNT UP HOOK ================= */
function useCountUp(value: number, duration = 800) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = value / (duration / 16);

    const counter = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(counter);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(counter);
  }, [value, duration]);

  return count;
}

export default function Home() {
  const [stats, setStats] = useState<any>(null);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  /* ================= FETCH STATS ================= */
  useEffect(() => {
    api
      .get("/analytics")
      .then((res) => setStats(res.data))
      .catch(() =>
        setStats({
          totalIssues: 12450,
          resolvedIssues: 9820,
          pendingIssues: 2100,
          totalDepartments: 15,
          avgResolutionTime: "48 hrs",
        })
      );
  }, []);

  const totalIssues = useCountUp(stats?.totalIssues || 0);
  const resolvedIssues = useCountUp(stats?.resolvedIssues || 0);
  const pendingIssues = useCountUp(stats?.pendingIssues || 0);
  const departments = useCountUp(stats?.totalDepartments || 0);

  return (
    <main className="bg-slate-950 text-white overflow-x-hidden">
      <Header />
      <Hero />

      {/* ================= ABOUT ================= */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-4xl font-semibold mb-6">
          What is Civic Connect?
        </h2>
        <p className="max-w-3xl text-slate-300 leading-relaxed text-lg">
          Civic Connect is a centralized digital grievance redressal
          platform that enables citizens to report civic issues such as
          road damage, water leakage, electricity failures, and sanitation
          problems.
        </p>
      </section>

      {/* ================= STATS ================= */}
      <section className="bg-slate-900 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <h2 className="text-4xl font-semibold mb-14 text-center">
            Live Public Statistics
          </h2>

          {!stats ? (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-5">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-28 bg-slate-800 animate-pulse rounded-xl"
                />
              ))}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-5 text-center">
              {[
                { label: "Total Complaints", value: totalIssues, color: "text-indigo-400" },
                { label: "Resolved", value: resolvedIssues, color: "text-green-400" },
                { label: "In Progress", value: pendingIssues, color: "text-yellow-400" },
                { label: "Departments", value: departments, color: "text-cyan-400" },
                { label: "Avg Resolution", value: stats.avgResolutionTime, color: "text-pink-400" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-slate-800 border border-slate-700 p-6 rounded-xl hover:scale-105 transition"
                >
                  <p className={`text-3xl font-bold ${item.color}`}>
                    {item.value}
                  </p>
                  <p className="text-slate-300 mt-2">{item.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="max-w-7xl mx-auto px-6 py-28">
        <h2 className="text-4xl font-semibold mb-14 text-center">
          How it works
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {["Report", "Track", "Resolve"].map((step, i) => (
            <div
              key={i}
              className="bg-slate-800 border border-slate-700 p-8 rounded-2xl hover:-translate-y-2 hover:shadow-2xl transition"
            >
              <h3 className="text-xl font-semibold mb-3 text-indigo-400">
                {step}
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Citizens and authorities interact through transparent,
                real-time complaint workflows.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-4xl font-semibold mb-12">
          Frequently Asked Questions
        </h2>

        {[
          "Who can register a complaint?",
          "Is there any fee?",
          "How long does resolution take?",
          "Can I track complaint status?",
        ].map((q, i) => (
          <div
            key={i}
            className="mb-4 border border-slate-700 rounded-xl overflow-hidden"
          >
            <button
              onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
              className="w-full text-left px-6 py-4 bg-slate-800 hover:bg-slate-700 transition flex justify-between"
            >
              <span className="font-semibold">{q}</span>
              <span>{openFAQ === i ? "−" : "+"}</span>
            </button>

            {openFAQ === i && (
              <div className="px-6 py-4 text-slate-300 bg-slate-900">
                This information is available to all registered users
                through the Civic Connect platform.
              </div>
            )}
          </div>
        ))}
      </section>

      {/* ================= CTA ================= */}
      <section className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Make your city better, starting today
          </h2>

          <p className="text-slate-300 max-w-2xl mx-auto mb-10 text-lg">
            Join Civic Connect and help build transparent, responsive
            cities.
          </p>

          <div className="flex justify-center gap-4">
            <a
              href="/register"
              className="px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 hover:scale-105 transition font-medium"
            >
              Register Complaint
            </a>
            <a
              href="/login"
              className="px-8 py-3 rounded-xl border border-slate-500 hover:bg-slate-800 transition font-medium"
            >
              Login
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
