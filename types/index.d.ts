export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

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

export type Post = {
  title: string;
  description: string;
  date: string;
  content: string;
  slug: string;
  published?: boolean;
}
