import {
    Cloud,
    CreditCard,
    Github,
    Keyboard,
    KeyRound,
    LifeBuoy,
    LogOut,
    Mail,
    MessageSquare,
    Plus,
    PlusCircle,
    Settings,
    User,
    UserPlus,
    Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuthContext } from "@/contexts/AuthContext"
import Link from "next/link"

const DropDownMenu = () => {
    const { signOut, user } = useAuthContext();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="link" className="focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0">
                    <User />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-82 mt-1 mr-2 bg-gray-50 border border-white">
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <User />
                        <span>{user?.userName}</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-gray-200" />
                    <DropdownMenuItem asChild>
                        <Link
                            href={`https://portal.gruposolar.com.br/changepassword?firstAccess=false&code=${user?.userCode}`}
                        >
                            <KeyRound />
                            <span>Alterar minha senha</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <button
                            className="w-full"
                            onClick={signOut}
                        >
                            <LogOut />
                            <span>Log out</span>
                        </button>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent >
        </DropdownMenu>
    )
}

export default DropDownMenu;