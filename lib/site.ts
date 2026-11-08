export const site = {
  name: "RaghuveerCV",
  role: "Tech Creator & PC Builder",
  tagline: "Funny computer vlogs, PC builds, and honest tech stories.",
  description:
    "Watch RaghuveerCV create PC builds, gaming laptop upgrades, desktop maintenance tutorials, and funny tech vlogs from Ranchi, Jharkhand.",
  location: "Ranchi, Jharkhand, India",
  email: "raghuveercvofficial@gmail.com",
  handle: "@RaghuveerCV",
  profileImage:
    "https://yt3.googleusercontent.com/QNQIdJyTo4tJarZBRGehnIO56DcQyVvt2lBTE-6mO9m8benggdxkDPwbNqljG8k2j9qyOMiqhsM=s900-c-k-c0x00ffffff-no-rj",
  youtube: {
    channelId:
      process.env.YOUTUBE_CHANNEL_ID?.trim() || "UCjD4rolLMD0hG4IojaPMpDw",
    handle: "@RaghuveerCV",
    url: "https://www.youtube.com/@RaghuveerCV",
  },
  instagram: {
    handle: "@raghuveer_cv",
    url: "https://www.instagram.com/raghuveer_cv/?hl=en",
  },
  storeUrl: "#about",
  stats: [
    { label: "YouTube", value: "211K+" },
    { label: "Content", value: "1.1K+ videos" },
    { label: "Focus", value: "PC & Tech" },
    { label: "Based in", value: "Ranchi" },
  ],
  about: {
    title: "Information with a smile",
    body: [
      "RaghuveerCV shares funny computer and technology vlogs while helping viewers understand practical upgrades, PC builds, laptop maintenance, and everyday tech.",
      "From a middle-class-family dream setup to gaming PC builds and a village CSC centre, every video blends useful information with a light, family-friendly presentation.",
    ],
  },
  featuredInstagram: [],
} as const;
