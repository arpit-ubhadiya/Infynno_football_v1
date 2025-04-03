import { Calendar, ChevronDown, Home, Inbox, LogOut, Search, Settings, Speaker, User } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  // SidebarGroupAction,
  SidebarGroupContent,
  // SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import Link from "next/link"

type Item = {
  title: string
  url: string
  icon: any
}

export function AppSidebar() {

  const items: Item[] = [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    {
      title: "Inbox",
      url: "/inbox",
      icon: Inbox,
    },
    {
      title: "Calendar",
      url: "/calendar",
      icon: Calendar,
    },
    {
      title: "Search",
      url: "/search",
      icon: Search,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
  ]


  return (
    <Sidebar className="border-none">
      <SidebarHeader className="py-[31px]">
        <div className="font-sofia text-center font-extrabold italic text-[25px] leading-[100%] tracking-[0%] uppercase">
          football<span className="text-primary-foreground font-normal italic text-[25px] leading-[100%] tracking-[0%] uppercase">shuru</span>
        </div>
      </SidebarHeader>

      <SidebarContent className="overflow-x-hidden">

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => <CustomSidebarItem key={item.title} item={item} />)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="bg-amber-50 !w-[calc(100%-50px)] !mx-[20px] !my-4" />

        <SidebarMenu className="!px-[10px]">
          <Collapsible className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton className="justify-between">
                  <div className="flex items-center gap-[8px]">
                    <Speaker className="h-6 w-6" />
                    <span className="font-normal text-base leading-[100%] tracking-[0%] capitalize">followed team</span>
                  </div>
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-360 rotate-270" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent className="px-[10px]">
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    Team 1
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    Team 2
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        </SidebarMenu>

      </SidebarContent>

      <SidebarFooter>
        <div className="flex gap-[8px] pb-[10px] items-center justify-around">
          <div className="flex flex-1 p-[4px] h-[42px] items-center gap-[10px] rounded-[10px] bg-background">
            <div className="relative !h-[35px] !w-[35px] bg-primary-foreground rounded-[10px] flex items-center justify-center">
              <User className="absolute top-3.5 text-black !h-[24px] !w-[24px]" />
            </div>
            <div>
              <p className="font-bold text-[15px] leading-[100%] tracking-[0%] capitalize text-primary-foreground">React Artist</p>
              <p className="font-bold text-xs leading-[100%] tracking-[0%] lowercase">reactartist@gmail.com</p>
            </div>
          </div>
          <div className="bg-background h-[42px] w-[42px] flex items-center justify-center rounded-[10px] ">
            <LogOut className="text-primary-foreground" />
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

const CustomSidebarItem = ({ item }: { item: Item }) => {
  return (
    <SidebarMenuItem key={item.title} className="h-[35px] relative">
      <SidebarMenuButton asChild url={item.url} className="text-[20px]">
        <Link href={item.url} className="gap-[8px]">
          <item.icon className="!h-[24px] !w-[24px]" />
          <span className="font-sofia">{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}
