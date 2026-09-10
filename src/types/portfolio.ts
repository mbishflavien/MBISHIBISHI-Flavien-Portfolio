import React from 'react';

export type Language = 'en' | 'sw' | 'rw' | 'fr';

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  image: string;
  link?: string;
  github?: string;
  color: string;
  features: string[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string[];
  verifyLink?: string;
}

export interface SkillItem {
  name: string;
  level: number;
  category: string;
  details: string;
}

export interface AwardItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: string;
  description: string;
  category: string;
  verifyLink?: string;
}

export interface Translation {
  nav: {
    about: string;
    experience: string;
    skills: string;
    projects: string;
    awards: string;
    contact: string;
    download_cv: string;
    language: string;
  };
  hero: {
    greeting: string;
    role: string;
    description: string;
    cta_projects: string;
    cta_contact: string;
    open_to_work: string;
  };
  about: {
    title: string;
    subtitle: string;
    description: string;
    location: string;
    location_value: string;
    education: string;
    education_value: string;
    education_period: string;
    stats: {
      experience: string;
      projects: string;
      clients: string;
    };
    experience_card: { title: string; description: string };
    certifications_card: { title: string; description: string };
  };
  experience: {
    title: string;
    subtitle: string;
    items: ExperienceItem[];
  };
  skills: {
    title: string;
    subtitle: string;
    items: SkillItem[];
    proficiency: string;
    expertise_details: string;
    close_details: string;
    other_tools: string;
  };
  projects: {
    title: string;
    subtitle: string;
    demo_unavailable: string;
    view_details: string;
    items: ProjectItem[];
    modal: {
      overview: string;
      key_features: string;
      links: string;
      view_code: string;
      launch_demo: string;
      close: string;
    };
  };
  awards: {
    title: string;
    subtitle: string;
    view_certificate: string;
    hover_reveal: string;
    view_credential: string;
    items: AwardItem[];
    modal: {
      issued: string;
      verified_credential: string;
      verify_google: string;
      open_image: string;
      about_credential: string;
      close: string;
    };
  };
  contact: {
    title: string;
    subtitle: string;
    name: string;
    email: string;
    message: string;
    send: string;
    sending: string;
    success: string;
    error: string;
    phone: string;
    location: string;
    email_me: string;
    call_me: string;
    build_great: string;
    message_placeholder: string;
    name_error: string;
    email_error: string;
    email_invalid: string;
    message_error: string;
    message_too_short: string;
  };
  footer: {
    rights: string;
    privacy: string;
    terms: string;
    visits: string;
  };
  common: {
    select_language: string;
    back_to_top: string;
  };
}

export interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
}
