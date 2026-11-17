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
    channelId: process.env.YOUTUBE_CHANNEL_ID?.trim() || "",
    handle: "@RaghuveerCV",
    url: "https://www.youtube.com/@RaghuveerCV",
  },
  secondYoutube: {
    channelId: process.env.YOUTUBE_NANKUTECH_CHANNEL_ID?.trim() || "",
    name: "Nanku Tech",
    handle: "@nankutech",
    url: "https://youtube.com/@nankutech?si=HtAR2wbWNe45u7wa",
  },
  instagram: {
    handle: "@raghuveer_cv",
    url: "https://www.instagram.com/raghuveer_cv?vrfl=czU0cmsyaWQ5a3R3&utm_source=qr",
  },
  socialLinks: [
    {
      platform: "Facebook",
      handle: "RaghuveerCV",
      url: "https://www.facebook.com/share/1dDxSJkCje/?mibextid=wwXIfr",
    },
    {
      platform: "YouTube",
      handle: "@nankutech",
      url: "https://youtube.com/@nankutech?si=HtAR2wbWNe45u7wa",
    },
    {
      platform: "Instagram",
      handle: "@raghuveer_cv",
      url: "https://www.instagram.com/raghuveer_cv?vrfl=czU0cmsyaWQ5a3R3&utm_source=qr",
    },
  ],
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
