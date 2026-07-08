import { createContext, useContext, useState, ReactNode } from 'react';

type Lang = 'TR' | 'EN';

const translations = {
  TR: {
    nav: {
      mission: 'Misyon & Vizyon',
      byk: 'BYK',
      works: 'Çalışmalarımız',
      join: 'Üye Ol',
      contact: 'İletişim',
    },
    hero: {
      badge: 'Uluslararası Demokratlar Birliği — Toronto',
      line1a: 'Yarını',
      line1b: "Şekillendiriyoruz",
      line2a: 'Liderlik',
      line2b: 'Birlikte',
      subtitle: "Toronto'daki Türk-Kanadalı topluluğu bir araya getirerek demokratik değerler, sivil katılım ve kültürel miras üzerine inşa edilmiş güçlü bir liderlik hareketi.",
      ctaPrimary: 'Üye Ol / Become a Member',
      ctaSecondary: 'Hakkımızda / Discover UID',
    },
    mission: {
      tag: 'DEĞERLER & HEDEFLER',
      heading: 'Misyon & Vizyon',
      missionTag: 'MİSYON',
      missionTitle: 'Görevimiz / Our Mission',
      missionP1: "UID Toronto, Toronto'daki Türk-Kanadalı topluluğunu sivil katılım, demokratik değerler ve kültürel koruma etrafında bir araya getirmek için çalışmaktadır.",
      missionP2: 'Üyelerimizi eğitim, savunuculuk ve topluluk programları aracılığıyla güçlendirerek hem yerel hem de ulusal düzeyde anlamlı bir değişim yaratıyoruz.',
      missionP3: "Kültürel mirasımızı korurken Kanada'nın çok kültürlü dokusuna katkıda bulunarak, daha güçlü ve daha bağlantılı bir demokrasi inşa ediyoruz.",
      visionTag: 'VİZYON',
      visionTitle: 'Hedefimiz / Our Vision',
      visionP1: "Kanada ve uluslararası arenada demokrasi, kültür ve sivil hayatta liderlik eden güçlü ve birleşik bir Türk-Kanadalı topluluk oluşturmayı hedefliyoruz.",
      visionP2: 'Her üyemizin sesini duyurabildiği, toplumsal kararlara katılabildiği ve kültürel kimliğini gururla yaşattığı bir platform yaratmak temel vizyonumuzdur.',
      visionP3: "Geleceğin liderlerini yetiştiren, köklü değerlere sahip ilerici bir hareket olarak Kanada demokrasisine kalıcı katkılar sağlamayı amaçlıyoruz.",
    },
    byk: {
      tag: 'YÖNETİM',
      heading: 'BYK — Bölge Yönetim Kurulu',
      sub: 'Regional Executive Board / Bölgesel Yürütme Kurulu',
    },
    works: {
      tag: 'FAALİYETLER',
      heading: 'Çalışmalarımız / Our Works',
      sub: 'Topluluk, kültür ve demokrasi adına gerçekleştirdiğimiz etkinlikler ve programlar.',
      cta: 'Tümünü Gör / View All Works',
    },
    membership: {
      tag: 'ÜYELİK',
      heading: 'Üye Ol / Join Us',
      plan: 'Member / Üye',
      cancel: 'Cancel anytime · No commitment',
      cta: 'Üye Ol / Join Now',
      trust1: 'Güvenli üyelik',
      trust2: 'Güçlü topluluk',
      trust3: 'Gelecek odaklı liderlik',
      features: [
        'Tüm etkinlik ve toplantılara katılım hakkı',
        'Özel liderlik ve eğitim programları',
        'Topluluk ağına ve mentorlara erişim',
        'Aylık dijital bülten ve güncellemeler',
        'Ulusal ve uluslararası UID platformuna erişim',
      ],
    },
    newsletter: {
      tag: 'BÜLTENİMİZ',
      heading: 'Bültenimize Katılın',
      headingSub: 'Join Our Newsletter',
      quote: '"Together, we shape the future of our community."',
      quoteTr: '"Birlikte toplumumuzun geleceğini inşa ediyoruz."',
      firstName: 'Ad / First Name',
      lastName: 'Soyad / Last Name',
      email: 'E-posta / Email',
      city: 'Şehir / City',
      submit: 'Bültene Abone Ol / Subscribe',
      successTitle: 'Teşekkürler!',
      successMsg: 'Bültenimize başarıyla abone oldunuz. Yakında haberdar olacaksınız.',
    },
    footer: {
      desc: "Kanada'da demokrasi ve topluluğu güçlendiriyoruz.",
      descEn: 'Strengthening democracy and community across Canada.',
      org: 'Organizasyon',
      community: 'Topluluk',
      contact: 'İletişim',
      copyright: '© 2026 UID Toronto. Tüm hakları saklıdır.',
    },
    worksPage: {
      breadHome: 'Ana Sayfa / Home',
      tag: 'FAALİYETLER',
      heading: 'Çalışmalarımız / Our Works',
      sub: 'Topluluk, kültür ve demokrasi adına gerçekleştirdiğimiz tüm etkinlikler, programlar ve projeler.',
      readMore: 'Devamını Oku',
      filterAll: 'Tümü / All',
    },
  },
  EN: {
    nav: {
      mission: 'Mission & Vision',
      byk: 'Executive Board',
      works: 'Our Works',
      join: 'Join',
      contact: 'Contact',
    },
    hero: {
      badge: 'Union of International Democrats — Toronto',
      line1a: 'Shaping',
      line1b: "Tomorrow's",
      line2a: 'Leadership',
      line2b: 'Together',
      subtitle: 'Uniting the Turkish-Canadian community around democratic values, civic engagement, and cultural heritage — building a powerful leadership movement in Toronto.',
      ctaPrimary: 'Join Now / Üye Ol',
      ctaSecondary: 'About UID / Hakkımızda',
    },
    mission: {
      tag: 'VALUES & GOALS',
      heading: 'Mission & Vision',
      missionTag: 'MISSION',
      missionTitle: 'Our Mission / Görevimiz',
      missionP1: 'UID Toronto works to unite the Turkish-Canadian community in Toronto around civic engagement, democratic values, and cultural preservation.',
      missionP2: 'We empower our members through education, advocacy, and community programs, creating meaningful change at both local and national levels.',
      missionP3: "While preserving our cultural heritage, we contribute to Canada's multicultural fabric, building a stronger and more connected democracy.",
      visionTag: 'VISION',
      visionTitle: 'Our Vision / Hedefimiz',
      visionP1: 'We aim to build a strong, united Turkish-Canadian community that leads in democracy, culture, and civic life in Canada and internationally.',
      visionP2: 'Our core vision is to create a platform where every member can be heard, participate in community decisions, and proudly live their cultural identity.',
      visionP3: 'As a progressive movement nurturing future leaders with deep-rooted values, we aim to make lasting contributions to Canadian democracy.',
    },
    byk: {
      tag: 'LEADERSHIP',
      heading: 'Regional Executive Board',
      sub: 'Bölge Yönetim Kurulu / BYK',
    },
    works: {
      tag: 'ACTIVITIES',
      heading: 'Our Works / Çalışmalarımız',
      sub: 'Events and programs carried out for the benefit of community, culture, and democracy.',
      cta: 'View All Works / Tümünü Gör',
    },
    membership: {
      tag: 'MEMBERSHIP',
      heading: 'Join Us / Üye Ol',
      plan: 'Member / Üye',
      cancel: 'Cancel anytime · No commitment',
      cta: 'Join Now / Üye Ol',
      trust1: 'Secure membership',
      trust2: 'Trusted community',
      trust3: 'Future-focused leadership',
      features: [
        'Access to all events & meetings',
        'Exclusive leadership & training programs',
        'Access to community network & mentors',
        'Monthly digital newsletter & updates',
        'Access to national & international UID platform',
      ],
    },
    newsletter: {
      tag: 'NEWSLETTER',
      heading: 'Join Our Newsletter',
      headingSub: 'Bültenimize Katılın',
      quote: '"Together, we shape the future of our community."',
      quoteTr: '"Birlikte toplumumuzun geleceğini inşa ediyoruz."',
      firstName: 'First Name / Ad',
      lastName: 'Last Name / Soyad',
      email: 'Email / E-posta',
      city: 'City / Şehir',
      submit: 'Subscribe to Newsletter / Abone Ol',
      successTitle: 'Thank You!',
      successMsg: 'You have successfully subscribed to our newsletter. Stay tuned for updates.',
    },
    footer: {
      desc: 'Strengthening democracy and community across Canada.',
      descEn: "Kanada'da demokrasi ve topluluğu güçlendiriyoruz.",
      org: 'Organization',
      community: 'Community',
      contact: 'Contact',
      copyright: '© 2026 UID Toronto. All rights reserved.',
    },
    worksPage: {
      breadHome: 'Home / Ana Sayfa',
      tag: 'ACTIVITIES',
      heading: 'Our Works / Çalışmalarımız',
      sub: 'All events, programs, and projects carried out for community, culture, and democracy.',
      readMore: 'Read More',
      filterAll: 'All / Tümü',
    },
  },
} as const;

type Translations = typeof translations.TR;

interface LangContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
}

const LangContext = createContext<LangContextType>({
  lang: 'TR',
  setLang: () => {},
  t: translations.TR,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('TR');
  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
