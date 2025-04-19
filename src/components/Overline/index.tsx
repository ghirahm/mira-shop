interface OverlineProps {
    title: string;
}

const Overline: React.FC<OverlineProps> = ({ title }) => {
    return (
        <div className="border-2 border-[var(--foreground)] w-fit rounded-full px-6 py-2">
            <p className="text-xs capitalize">
                {title}
            </p>
        </div>
    )
}

export default Overline;