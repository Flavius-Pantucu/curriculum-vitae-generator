import { CurriculumStateProps } from "@data/types/curriculumStateProps";

export function MainSection(curriculumState: CurriculumStateProps) {
    return (
        <div className="flex-[2] w-full h-full">
            <div className="flex flex-col w-full h-full px-8">
                <div className="flex-1 flex items-center justify-center">
                    <div className="flex flex-col gap-y-2">
                        <span
                            className={`font-bold break-all text-[#323B4C] tracking-[0.1em] ${
                                curriculumState.profile.fullName.length < 16
                                    ? "text-4xl"
                                    : curriculumState.profile.fullName.length < 23
                                    ? "text-2xl"
                                    : "text-lg"
                            }`}
                        >
                            {curriculumState.profile.fullName}
                        </span>
                        <span
                            className={`font-normal break-all text-[#323B4C] tracking-[0.2em] ${
                                curriculumState.profile.jobTitle.length < 26
                                    ? "text-xl"
                                    : curriculumState.profile.jobTitle.length > 32
                                    ? "text-xs"
                                    : ""
                            }`}
                        >
                            {curriculumState.profile.jobTitle}
                        </span>
                        <span className="text-xs text-gray-400">{curriculumState.profile.description}</span>
                    </div>
                </div>

                <div className="flex-[3] flex flex-col gap-y-4">
                    <div className="border-b border-[#323B4C] w-full pb-2">
                        <h1 className="font-semibold text-2xl font-mono text-[#323B4C]">Experience</h1>
                    </div>
                    <div className="flex flex-col pt-1">
                        {curriculumState.experience.map((exp, i) => (
                            <div
                                key={i}
                                className={`relative border-l-2 border-slate-600 pl-4 ${
                                    i !== curriculumState.experience.length - 1 ? "pb-8" : ""
                                }`}
                            >
                                <div className="absolute -left-1.5 top-0 w-3 h-3 border-slate-600 rounded-full border-2 bg-white" />
                                <p className="text-sm/3 text-gray-500 font-bold">{exp.years}</p>
                                <p className="text-gray-400 text-sm font-semibold mt-1">{exp.company}</p>
                                <p className="font-bold text-slate-800 text-sm mb-2">{exp.jobTitle}</p>
                                <p className="text-gray-500 text-xs whitespace-pre-wrap break-all">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex-1 flex flex-col gap-y-4">
                    <div className="border-b border-[#323B4C] w-full pb-2">
                        <h1 className="font-bold text-2xl font-mono text-[#323B4C]">References</h1>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        {curriculumState.references.map((ref, i) => (
                            <div key={i}>
                                <p className="font-bold text-gray-800">{ref.name}</p>
                                <p className="text-gray-700">{ref.company}</p>
                                <p className="text-gray-700">{ref.title}</p>
                                <div className="flex flex-row gap-x-1 mt-1 text-xs text-slate-600">
                                    <span className="font-semibold">Phone:</span> {ref.phone}
                                </div>
                                <div className="flex flex-row gap-x-1 mt-1 text-xs text-slate-600">
                                    <span className="font-semibold">Email:</span> {ref.email}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
