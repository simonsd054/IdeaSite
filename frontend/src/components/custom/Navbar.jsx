import { Link } from "react-router-dom"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useGlobalContext } from "@/utils/reducer"

const navbarItemsLoggedIn = [
  {
    content: "Home",
    linkTo: "/",
  },
  {
    content: "Post Idea",
    linkTo: "/ideas/create",
  },
]

const navbarItemsNotLoggedIn = [
  {
    content: "Register",
    linkTo: "/auth/register",
  },
  { content: "Login", linkTo: "/auth/login" },
]

export default function Navbar() {
  const { store, dispatch } = useGlobalContext()

  const navbarItems = store.token ? navbarItemsLoggedIn : navbarItemsNotLoggedIn

  const onClickLogout = () => {
    dispatch({
      type: "setToken",
      data: null,
    })
    dispatch({
      type: "setUser",
      data: {},
    })
  }

  const splittedUserName = store?.user?.name?.split(" ")

  return (
    <NavigationMenu className="bg-slate-200 w-full max-w-full justify-between p-3 fixed h-[64px] top-0">
      <NavigationMenuList className="flex gap-5">
        <NavigationMenuItem>
          <Link to="/" className="text-slate-800 text-lg hover:text-slate-600">
            Logo
          </Link>
        </NavigationMenuItem>
        {navbarItems.map((item) => (
          <NavigationMenuItem key={item.content}>
            <Link
              to={item.linkTo}
              className="text-slate-800 text-lg hover:text-slate-600"
            >
              {item.content}
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
      {store.token && (
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none">
            <Avatar className="cursor-pointer">
              <AvatarImage src="<avatar-image-link>" alt="avatar" />
              <AvatarFallback>
                {splittedUserName?.map((name) => name?.[0])}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <Link to="my-ideas">
              <DropdownMenuItem className="cursor-pointer">
                My Ideas
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={onClickLogout}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </NavigationMenu>
  )
}
