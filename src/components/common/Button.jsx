export default function Button({
    children,
    variant = "primary",
    size = "md",
    className = "",
    ...props
}){
    const base =
        "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-[#6366F1] text-white hover:bg-[#4F46E5]",
        secondary: "bg-[#0F172A] text-white hover:bg-[#1e293b]",
        outlined:
            "border border-[#0F172A]/20 text-[#0F172A] hover:bg-white",
        inverted:
            "bg-white text-[#6366F1] hover:bg-indigo-50",
        ghost:
            "text-[#64748B] hover:text-[#0F172A]",
    };

    const sizes = {
        sm: "text-xs px-4 py-2",
        md: "text-sm px-6 py-3",
        lg: "text-sm px-8 py-3.5",
    };

    return (
        <button
            className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}