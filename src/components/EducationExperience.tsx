import { Briefcase, GraduationCap, Calendar, MapPin, ExternalLink } from 'lucide-react';

export default function EducationExperience() {
  const experiences = [
    {
      role: "Full Stack Developer (Remote)",
      company: "Luminous Skill Development Training Center",
      duration: "December 2025 - Present",
      location: "Remote, Bangladesh",
      desc: "Working remotely as a Full Stack Developer, building and maintaining the organization's web platform (luminouscentre.org). Developing LMS features, course management modules, admin dashboards, and responsive UI layouts using React, Next.js, Node.js, PostgreSQL, and Supabase.",
      current: true,
      link: "https://luminouscentre.org"
    },
    {
      role: "MERN Stack Development",
      company: "Programming Hero (Course Graduate)",
      duration: "2025",
      location: "Online, Bangladesh",
      desc: "Completed an intensive MERN Stack (MongoDB, Express.js, React, Node.js) web development course. Built multiple real-world projects covering authentication, CRUD operations, REST API design, responsive layouts, and deployment to production.",
      current: false,
      link: "https://web.programming-hero.com"
    }
  ];

  const education = [
    {
      degree: "Bachelor of Science (B.Sc)",
      institution: "Narsingdi Govt. College",
      duration: "2021 - Expected 2027",
      location: "Narsingdi, Dhaka, Bangladesh",
      desc: "Pursuing Bachelor of Science (B.Sc) majoring in Physics, Chemistry, and Mathematics (PCM). Cultivating strong analytical reasoning, quantitative modeling, and problem-solving foundations alongside modern software engineering.",
      current: true
    },
    {
      degree: "Higher Secondary Certificate (HSC)",
      institution: "Bara Chapa Union Adarsha Degree College",
      duration: "Passed in 2021",
      location: "Bangladesh",
      desc: "Completed Higher Secondary Certificate in Science group. Studied Physics, Chemistry, Mathematics, and ICT.",
      current: false
    }
  ];

  return (
    <section id="experience" className="py-14 sm:py-16 relative overflow-hidden">
      <div className="max-w-[1380px] mx-auto px-6 md:px-12 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200/50 dark:border-indigo-800/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-widest mb-4">
            Qualifications
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Experience &amp; <span className="text-gradient">Education</span>
          </h2>
          <p className="mt-4 text-slate-500 dark:text-zinc-400 text-sm sm:text-base max-w-lg mx-auto">
            My professional journey and academic background that shaped my development career.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Experience */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-200/60 dark:border-zinc-800/60">
              <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Experience</h3>
            </div>

            <div className="space-y-6 relative ml-4 pl-8 border-l-2 border-slate-200 dark:border-zinc-800">
              {experiences.map((exp, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline dot */}
                  <div className={`absolute -left-[calc(2rem+5px)] top-1.5 w-3 h-3 rounded-full border-2 transition-all duration-300 z-10 ${
                    exp.current
                      ? 'border-indigo-500 bg-indigo-500 shadow-lg shadow-indigo-500/50'
                      : 'border-indigo-400 bg-white dark:bg-zinc-950 group-hover:bg-indigo-500'
                  }`} />

                  <div className="p-6 rounded-2xl bg-white/50 dark:bg-zinc-900/50 border border-slate-200/60 dark:border-zinc-800/60 backdrop-blur-sm hover:border-indigo-300/40 dark:hover:border-indigo-800/40 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div>
                        <h4 className="text-lg font-bold text-slate-900 dark:text-white">{exp.role}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          {exp.link ? (
                            <a
                              href={exp.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 hover:underline transition-colors group/link"
                              aria-label={`Visit ${exp.company} website`}
                            >
                              <span>{exp.company}</span>
                              <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                            </a>
                          ) : (
                            <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">{exp.company}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col items-start sm:items-end gap-1">
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 dark:text-zinc-400 bg-slate-100 dark:bg-zinc-800/60 px-2.5 py-1 rounded-lg">
                          <Calendar className="w-3 h-3" />
                          {exp.duration}
                        </span>
                        {exp.current && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Current
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-xs text-slate-600 dark:text-zinc-400">
                      <MapPin className="w-3 h-3" />
                      {exp.location}
                    </div>

                    <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
                      {exp.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-200/60 dark:border-zinc-800/60">
              <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Education</h3>
            </div>

            <div className="space-y-6 relative ml-4 pl-8 border-l-2 border-slate-200 dark:border-zinc-800">
              {education.map((edu, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline dot */}
                  <div className={`absolute -left-[calc(2rem+5px)] top-1.5 w-3 h-3 rounded-full border-2 transition-all duration-300 z-10 ${
                    edu.current
                      ? 'border-indigo-500 bg-indigo-500 shadow-lg shadow-indigo-500/50'
                      : 'border-indigo-400 bg-white dark:bg-zinc-950 group-hover:bg-indigo-500'
                  }`} />

                  <div className="p-6 rounded-2xl bg-white/50 dark:bg-zinc-900/50 border border-slate-200/60 dark:border-zinc-800/60 backdrop-blur-sm hover:border-indigo-300/40 dark:hover:border-indigo-800/40 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div>
                        <h4 className="text-lg font-bold text-slate-900 dark:text-white">{edu.degree}</h4>
                        <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mt-1">{edu.institution}</p>
                      </div>
                      <div className="flex flex-col items-start sm:items-end gap-1">
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 dark:text-zinc-400 bg-slate-100 dark:bg-zinc-800/60 px-2.5 py-1 rounded-lg">
                          <Calendar className="w-3 h-3" />
                          {edu.duration}
                        </span>
                        {edu.current && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Ongoing
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-xs text-slate-600 dark:text-zinc-400">
                      <MapPin className="w-3 h-3" />
                      {edu.location}
                    </div>

                    <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
                      {edu.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
