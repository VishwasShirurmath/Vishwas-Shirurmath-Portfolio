import { useState } from 'react';
import { motion } from 'motion/react';
import { ProfileInfo } from '../types';
import { GraduationCap, Briefcase, Mail, MapPin, ExternalLink, Award, FileText, Check } from 'lucide-react';

interface AboutSectionProps {
  profile: ProfileInfo;
  accentClass: string;
  cardBgClass: string;
}

export default function AboutSection({ profile, accentClass, cardBgClass }: AboutSectionProps) {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="about-section-pane">
      {/* Left Column: Brief summary card & interactive contact hubs */}
      <div className="lg:col-span-5 space-y-6">
        <div className={`p-6 rounded-2xl border border-stone-200/50 ${cardBgClass} space-y-5`}>
          {/* Avatar Area */}
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-stone-950 font-black text-2xl shadow-lg shadow-amber-500/10">
              VS
            </div>
            <div>
              <h4 className="font-extrabold text-stone-900 text-lg leading-tight">{profile.name}</h4>
              <p className="text-xs text-stone-500 font-medium mt-0.5">{profile.role}</p>
              <p className="text-[10px] font-mono text-stone-400 mt-1 flex items-center gap-1">
                <MapPin className="h-3 w-3 text-amber-500" /> {profile.location}
              </p>
            </div>
          </div>

          {/* Biography text */}
          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-sans">
            {profile.bio}
          </p>

          {/* Social Channels buttons */}
          <div className="space-y-2 pt-2 border-t border-stone-100">
            <p className="text-[11px] font-mono font-bold text-stone-400 uppercase tracking-widest mb-2.5">
              Contact & Social Channels
            </p>

            <a
              href={`mailto:${profile.email}`}
              className="flex items-center justify-between p-2.5 rounded-xl border border-stone-200 text-stone-700 bg-white hover:bg-stone-50 transition-all text-xs"
            >
              <span className="flex items-center gap-2 font-medium">
                <Mail className="h-4 w-4 text-stone-400" /> email
              </span>
              <span className="text-stone-400 font-mono truncate max-w-[170px]">{profile.email}</span>
            </a>

            <div className="grid grid-cols-2 gap-2">
              <a
                href={profile.github}
                target="_blank"
                rel="no-referrer"
                className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl border border-stone-200 text-stone-700 bg-white hover:bg-stone-50 text-xs transition-all font-medium"
              >
                GitHub <ExternalLink className="h-3 w-3" />
              </a>

              <a
                href={profile.linkedin}
                target="_blank"
                rel="no-referrer"
                className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl border border-stone-200 text-stone-700 bg-white hover:bg-stone-50 text-xs transition-all font-medium"
              >
                LinkedIn <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* Resume View Mock */}
          <button
            onClick={() => {
              alert(
                'Self-Verifying CV View: Resume downloaded successfully! (This is a verified mock flow to showcase offline CV linkages in the platform).'
              );
            }}
            className={`w-full py-2.5 rounded-xl text-xs font-bold leading-normal text-white flex items-center justify-center gap-2 shadow-xs transition duration-200 ${accentClass}`}
          >
            <FileText className="h-4 w-4" /> Download Resume (CV)
          </button>
        </div>

        {/* Certifications and achievements list */}
        <div className={`p-5 rounded-2xl border border-stone-200/50 ${cardBgClass} space-y-3`}>
          <div className="flex items-center gap-2 pb-1.5 border-b border-stone-100">
            <Award className="h-4 w-4 text-amber-500" />
            <h5 className="font-extrabold text-stone-900 text-xs uppercase font-mono tracking-wider">
              Accolades & Milestones
            </h5>
          </div>

          <ul className="space-y-2.5 text-xs text-stone-600">
            <li className="flex gap-2 items-start">
              <span className="h-4 w-4 rounded bg-amber-50 text-amber-700 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                ●
              </span>
              <span>1st Place - University Technical App Hackathon, 2025</span>
            </li>
            <li className="flex gap-2 items-start">
              <span className="h-4 w-4 rounded bg-amber-50 text-amber-700 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                ●
              </span>
              <span>Consistent 50+ GitHub Commits Month-Over-Month Index</span>
            </li>
            <li className="flex gap-2 items-start">
              <span className="h-4 w-4 rounded bg-amber-50 text-amber-700 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                ●
              </span>
              <span>Certified React Architect Intern Certification, VTU Tech</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Right Column: Timelines of education & interactive Skills bento */}
      <div className="lg:col-span-7 space-y-6">
        {/* Education Timeline */}
        <div className={`p-6 rounded-2xl border border-stone-200/50 ${cardBgClass} space-y-4`}>
          <div className="flex items-center gap-1.5 pb-2.5 border-b border-stone-100">
            <GraduationCap className="h-5 w-5 text-amber-600" />
            <h4 className="font-extrabold text-stone-900 text-sm uppercase tracking-wide">
              Academic Milestones
            </h4>
          </div>

          <div className="space-y-6 relative pl-3.5 before:absolute before:left-1 before:top-2 before:bottom-2 before:w-[1.5px] before:bg-stone-250">
            {profile.education.map((edu, idx) => (
              <div key={idx} className="relative group space-y-1">
                {/* Timeline dot node */}
                <span className="absolute -left-[19px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-amber-500 bg-white group-hover:bg-amber-500 transition-all duration-200" />

                <div className="flex items-center justify-between text-xs font-mono text-stone-500">
                  <span className="font-semibold text-amber-700 bg-amber-50/50 px-2.5 py-0.5 rounded-full border border-amber-200/30">
                    {edu.period}
                  </span>
                  <span className="font-extrabold text-stone-950 bg-stone-100 px-2 py-0.5 rounded-md">
                    {edu.grade}
                  </span>
                </div>

                <h5 className="font-bold text-stone-900 text-sm pt-1 leading-snug group-hover:text-amber-800 transition-colors">
                  {edu.degree}
                </h5>

                <p className="text-xs font-semibold text-stone-500">{edu.institution}</p>

                <p className="text-stone-500 text-xs leading-relaxed font-sans pt-1">
                  {edu.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bento Interactive Skills Board */}
        <div className={`p-6 rounded-2xl border border-stone-200/50 ${cardBgClass} space-y-4`}>
          <div className="space-y-1 pb-2 border-b border-stone-100">
            <h4 className="font-extrabold text-stone-900 text-sm uppercase tracking-widest font-mono">
              Bento Skill Board
            </h4>
            <p className="text-xs text-stone-500">
              Click on any system capability to highlight proficiency and linked tags.
            </p>
          </div>

          {/* Skill Bento grid blocks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profile.skills.map((skillGroup, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-stone-50/55 border border-stone-200/30 space-y-3"
              >
                <h5 className="text-xs font-bold font-mono text-amber-800 tracking-wider uppercase">
                  {skillGroup.category}
                </h5>

                <div className="flex flex-wrap gap-1.5">
                  {skillGroup.items.map((skill) => {
                    const isSelected = selectedSkill === skill;
                    return (
                      <button
                        key={skill}
                        onClick={() => setSelectedSkill(isSelected ? null : skill)}
                        className={`text-xs px-2.5 py-1.5 rounded-lg border transition-all duration-200 flex items-center gap-1 ${
                          isSelected
                            ? 'bg-amber-600 text-white border-amber-600 shadow-md scale-102 font-bold'
                            : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50 hover:border-stone-300'
                        }`}
                      >
                        {isSelected && <Check className="h-3 w-3 stroke-[2.5] text-white" />}
                        {skill}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
