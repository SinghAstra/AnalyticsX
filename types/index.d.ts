export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

export type SidebarNavItem = {
  title: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
} & (
  | {
      href: string;
      items?: never;
    }
  | {
      href?: string;
      items: NavItem[];
    }
);

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
    github: string;
  };
};

export type HomeConfig = {
  mainNav: NavItem[];
};

export type DocsConfig = {
  mainNav: NavItem[];
  sidebarNav: SidebarNavItem[];
};

export type Post = {
  title: string;
  image: string;
  authors: string[];
  description: string;
  date: string;
  content: string;
  slug: string;
  published?: boolean;
};

export type Author = {
  title: string;
  avatar: string;
  twitter: string;
};

export type Doc = {
  title: string;
  description?: string | undefined;
  published: boolean;
  body: MDX;
  slug: string;
  slugAsParams: string;
};
