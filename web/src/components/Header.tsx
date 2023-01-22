import logoImage from '../assets/logo.svg'
import { Plus } from 'phosphor-react'

export function Header(){
    return(
        <header className="w-full max-w-3xl mx-auto flex items-center justify-between">
            <img 
                src={logoImage} 
                alt="Habits" 
            />

            <button
                type="button"
                className="border border-fuchsia-500 font-semibold rounded-lg px-6 py-4 flex gap-3 items-center hover:border-fuchsia-300"
            >
                <Plus size="20" className="text-fuchsia-500" />
                Novo Hábito
            </button>
        </header>
    )
}