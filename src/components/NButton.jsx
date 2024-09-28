'use client'

const NButton = ({ label, disabled=false, outline, wb, small, custom, icon:Icon, onClick}) => {
  return (
    <button 
          onClick={onClick}
          className={`
                    disabled:opacity-70
                    disabled:cursor-not-allowed
                    rounded-md
                    hover:opacity-80
                    transition
                    w-full
                    border-slate-700
                    flex
                    items-center
                    justify-center
                    gap-2
                    ${wb && "bg-green-700 border-green-800 text-white"}
                    ${outline ? "bg-white" : wb ? "" : "bg-slate-700"}
                    ${outline ? "text-slate-700" : wb ? "" : "text-white"}
                    ${small ? "text-sm font-light " : "text-md font-semibold"}
                    ${small ? "py-1 px-2 border-[1px]" : "py-3 px-4 border-2"}
                    ${disabled && "cursor-not-allowed hover:opacity-100 bg-slate-500"}
                    ${custom ? custom : ''}
                    `}>
        {Icon && <Icon size={24} />}
        {label}
    </button>
  )
}

export default NButton