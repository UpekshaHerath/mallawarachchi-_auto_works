import type { MediaName } from "./generated/media";

export type Bi = { en: string; si: string };

/*
 * Sinhala copy is written the way it is actually spoken in a Sri Lankan
 * workshop: Sinhala grammar with the technical vocabulary left in English.
 * Nobody at the counter says "සිසිලන පද්ධතිය" — they say "cooling system".
 * Translating those terms makes the page read like a government form.
 */

export type Service = {
  id: string;
  no: string;
  title: Bi;
  lead: Bi;
  jobs: Bi[];
  symptom: Bi;
  image: MediaName;
};

export const services: Service[] = [
  {
    id: "engine",
    no: "01",
    title: { en: "Engine Repair & Overhaul", si: "Engine අලුත්වැඩියාව සහ Overhaul" },
    lead: {
      en: "Full engine work - from a noisy top end to a complete strip-down, rebuild and re-timing.",
      si: "Top end එකේ හඬක් ඉඳන් සම්පූර්ණයෙන් ගලවලා rebuild කරලා timing දාන එක වෙනකම් හැම engine වැඩක්ම.",
    },
    jobs: [
      { en: "Cylinder head removal, skimming & gasket replacement", si: "Cylinder head ගලවා skim කිරීම සහ gasket මාරු කිරීම" },
      { en: "Timing belt, timing chain, tensioners & pulleys", si: "Timing belt, timing chain, tensioner සහ pulley" },
      { en: "Piston rings, bearings, valve seals & valve clearance", si: "Piston ring, bearing, valve seal සහ valve clearance" },
      { en: "Compression & leak-down testing before any strip-down", si: "ගලවන්න කලින් compression සහ leak-down test" },
      { en: "Oil leak tracing - rocker cover, sump, crank & cam seals", si: "Oil leak හොයාගැනීම - rocker cover, sump, crank සහ cam seal" },
      { en: "Engine mounts, vibration & rough-idle correction", si: "Engine mount, vibration සහ idle එක හරියට නොයන එක හදනවා" },
    ],
    symptom: {
      en: "Knocking, blue or white smoke, burning oil, misfire, won't start.",
      si: "තට්ටු හඬ, නිල් හෝ සුදු දුම, oil දැවෙනවා, misfire, start වෙන්නේ නෑ.",
    },
    image: "svc-engine",
  },
  {
    id: "cooling",
    no: "02",
    title: { en: "Cooling & Overheating", si: "Cooling System සහ Overheating" },
    lead: {
      en: "Overheating is a symptom, not a fault. We find which part of the loop failed before anything gets replaced.",
      si: "Overheat වීම කියන්නේ ලක්ෂණයක් මිසක් fault එක නෙවෙයි. මොනවහරි මාරු කරන්න කලින්, loop එකේ මොන කොටසද fail වෙලා තියෙන්නේ කියලා හොයාගන්නවා.",
    },
    jobs: [
      { en: "Radiator flush, re-core, repair or replacement", si: "Radiator එක සේදීම, re-core, අලුත්වැඩියාව හෝ මාරු කිරීම" },
      { en: "Thermostat, water pump & timing-driven pump failures", si: "Thermostat, water pump සහ timing එකෙන් ක්‍රියා කරන pump එකේ දෝෂ" },
      { en: "Radiator fan motor, fan clutch & fan switch faults", si: "Radiator fan motor, fan clutch සහ fan switch fault" },
      { en: "Hoses, clamps, expansion tank & pressure cap testing", si: "Hose, clamp, expansion tank සහ pressure cap පරීක්ෂාව" },
      { en: "Head gasket & combustion-gas-in-coolant diagnosis", si: "Head gasket එක සහ coolant එකට gas එනවද කියලා පරීක්ෂාව" },
      { en: "Correct coolant fill and full system bleed", si: "හරි coolant එක දාලා system එක සම්පූර්ණයෙන් bleed කිරීම" },
    ],
    symptom: {
      en: "Temp gauge climbing, coolant loss, steam, heater blowing cold.",
      si: "Temp gauge එක උඩට යනවා, coolant අඩු වෙනවා, වාෂ්ප, heater එකෙන් සීතල හුළඟ.",
    },
    image: "svc-cooling",
  },
  {
    id: "brakes",
    no: "03",
    title: { en: "Brake Systems", si: "Brake System එක" },
    lead: {
      en: "The one system we never rush. Every brake job leaves here with a road test and a pedal-feel check.",
      si: "අපි කවදාවත් ඉක්මන් නොකරන එකම system එක. හැම brake වැඩක්ම road test එකකට සහ pedal feel එක බලලා තමයි නිකුත් වෙන්නේ.",
    },
    jobs: [
      { en: "Disc pads, brake shoes & drum re-turning", si: "Disc pad, brake shoe සහ drum turning" },
      { en: "Disc skimming or replacement for judder", si: "Judder එකට disc skim කිරීම හෝ මාරු කිරීම" },
      { en: "Caliper overhaul, seized pistons & slider pins", si: "Caliper overhaul, හිර වුණු piston සහ slider pin" },
      { en: "Wheel cylinders, master cylinder & brake booster", si: "Wheel cylinder, master cylinder සහ brake booster" },
      { en: "Brake fluid change, full bleed & line/hose replacement", si: "Brake fluid මාරු කිරීම, bleed කිරීම සහ line/hose මාරු කිරීම" },
      { en: "Handbrake adjustment & ABS sensor fault diagnosis", si: "Handbrake adjust කිරීම සහ ABS sensor fault පරීක්ෂාව" },
    ],
    symptom: {
      en: "Squealing, grinding, soft or sinking pedal, pulling to one side.",
      si: "කෑ ගහන හඬ, අඹරන හඬ, pedal එක මෘදුයි නැත්නම් බහිනවා, එක පැත්තකට අදිනවා.",
    },
    image: "svc-brakes",
  },
  {
    id: "transmission",
    no: "04",
    title: { en: "Transmission & Clutch", si: "Gearbox සහ Clutch" },
    lead: {
      en: "Manual and automatic. We diagnose before we open - most gearbox complaints are not the gearbox.",
      si: "Manual සහ auto දෙකම. ගලවන්න කලින් check කරනවා - gearbox එක ගැන එන පැමිණිලිවලින් වැඩි ගාණක් ඇත්තටම gearbox එකේ නෙවෙයි.",
    },
    jobs: [
      { en: "Clutch plate, pressure plate, release bearing & slave cylinder", si: "Clutch plate, pressure plate, release bearing සහ slave cylinder" },
      { en: "Automatic transmission fluid & filter service", si: "Auto gearbox එකේ fluid සහ filter service" },
      { en: "Torque converter, shift-shock & slipping diagnosis", si: "Torque converter, shift shock සහ slip වීම පරීක්ෂාව" },
      { en: "Gear linkage, selector cables & mount replacement", si: "Gear linkage, selector cable සහ mount මාරු කිරීම" },
      { en: "CV joints, drive shafts & torn boots", si: "CV joint, drive shaft සහ ඉරී ගිය boot" },
      { en: "Differential and gearbox oil leaks & seals", si: "Differential සහ gearbox oil leak සහ seal" },
    ],
    symptom: {
      en: "Slipping, jerky shifts, clicking on turns, clutch not biting.",
      si: "Slip වෙනවා, gear මාරු වෙද්දී කැළඹෙනවා, හරවද්දී click හඬක්, clutch එක අල්ලන්නේ නෑ.",
    },
    image: "svc-transmission",
  },
  {
    id: "suspension",
    no: "05",
    title: { en: "Suspension & Steering", si: "Suspension සහ Steering" },
    lead: {
      en: "Sri Lankan roads are hard on bushes and joints. We check the whole corner, not just the part that squeaks.",
      si: "අපේ පාරවල් bush සහ joint වලට හරිම දරුණුයි. හඬ එන කොටස විතරක් නෙවෙයි, corner එකම බලනවා.",
    },
    jobs: [
      { en: "Shock absorbers, struts, coil springs & top mounts", si: "Shock absorber, strut, coil spring සහ top mount" },
      { en: "Control-arm bushes, ball joints & stabiliser links", si: "Control arm bush, ball joint සහ stabiliser link" },
      { en: "Tie rods, rack ends & steering rack overhaul", si: "Tie rod, rack end සහ steering rack overhaul" },
      { en: "Power steering pump, hoses & fluid leaks", si: "Power steering pump, hose සහ fluid leak" },
      { en: "Wheel bearings & hub noise", si: "Wheel bearing සහ hub එකේ හඬ" },
      { en: "Uneven tyre wear investigation", si: "Tyre අසමානව ගෙවෙන එකට හේතුව හොයාගැනීම" },
    ],
    symptom: {
      en: "Knocking over bumps, wandering steering, uneven tyre wear.",
      si: "Bump එකකදී තට්ටු හඬ, steering එක ස්ථාවර නෑ, tyre අසමානව ගෙවෙනවා.",
    },
    image: "svc-suspension",
  },
  {
    id: "fuel",
    no: "06",
    title: { en: "Fuel System - Petrol & Diesel", si: "Fuel System - Petrol සහ Diesel" },
    lead: {
      en: "Poor pickup and heavy fuel use usually start here. Injectors come out, get tested, and go back clean.",
      si: "Pickup එක අඩුවීම සහ fuel වැඩියෙන් යන එක ගොඩක් වෙලාවට පටන් ගන්නේ මෙතනින්. Injector ගලවලා, test කරලා, clean කරලා ආපහු දානවා.",
    },
    jobs: [
      { en: "Injector removal, cleaning, testing & seal kits", si: "Injector ගැලවීම, clean කිරීම, testing සහ seal kit" },
      { en: "Diesel nozzle & fuel pump work", si: "Diesel nozzle සහ fuel pump වැඩ" },
      { en: "Fuel pump, fuel filter & tank strainer replacement", si: "Fuel pump, fuel filter සහ tank strainer මාරු කිරීම" },
      { en: "Throttle body cleaning & idle relearn", si: "Throttle body clean කිරීම සහ idle relearn" },
      { en: "Air filter, intake leaks & MAF/MAP sensor faults", si: "Air filter, intake leak සහ MAF/MAP sensor fault" },
      { en: "Carburettor tuning & overhaul on older vehicles", si: "පරණ වාහනවල carburettor tuning සහ overhaul" },
    ],
    symptom: {
      en: "Hesitation, black smoke, hard starting, poor mileage.",
      si: "Pickup එක අඩුයි, කළු දුම, start වෙන්න අමාරුයි, mileage එක අඩුයි.",
    },
    image: "svc-fuel",
  },
  {
    id: "electrical",
    no: "07",
    title: { en: "Auto Electrical & Diagnostics", si: "Auto Electrical සහ Scanner පරීක්ෂාව" },
    lead: {
      en: "Scanner first, spanner second. A fault code is a starting point - we still trace the wire.",
      si: "මුලින්ම scanner එක, ඊට පස්සේ spanner එක. Fault code එකක් කියන්නේ පටන් ගන්න තැනක් විතරයි - wire එක අපි හොයාගෙනම යනවා.",
    },
    jobs: [
      { en: "Computer scanning, live data & fault-code tracing", si: "Computer scanning, live data සහ fault code හොයාගැනීම" },
      { en: "Alternator, starter motor & charging faults", si: "Alternator, starter motor සහ charging fault" },
      { en: "Battery testing, terminals & parasitic drain", si: "Battery test, terminal සහ battery බැහැලා යන එක" },
      { en: "Wiring repairs, earth faults & blown-fuse causes", si: "Wiring අලුත්වැඩියාව, earth fault සහ fuse යන එකට හේතුව" },
      { en: "Sensors - crank, cam, oxygen, coolant temp, ABS", si: "Sensor - crank, cam, oxygen, coolant temp, ABS" },
      { en: "Lights, wipers, power windows, central locking, horn", si: "Light, wiper, power window, central locking, horn" },
    ],
    symptom: {
      en: "Check-engine light, battery light, no crank, dash warnings.",
      si: "Check engine light, battery light, start වෙන්නේ නෑ, dash එකේ warning.",
    },
    image: "svc-electrical",
  },
  {
    id: "service",
    no: "08",
    title: { en: "Periodic Service & Inspection", si: "Periodic Service සහ පරීක්ෂාව" },
    lead: {
      en: "The cheap visit that prevents the expensive one. Oil, filters, fluids and a proper look underneath.",
      si: "මිල අධික අලුත්වැඩියාව නවත්වන ලාභ එන එක. Oil, filter, fluid සහ යටින් හරියට බැලීමක්.",
    },
    jobs: [
      { en: "Engine oil & filter, air, fuel and cabin filters", si: "Engine oil සහ filter, air, fuel සහ cabin filter" },
      { en: "Spark plugs, ignition coils & plug-lead checks", si: "Spark plug, ignition coil සහ plug lead පරීක්ෂාව" },
      { en: "Belts, hoses, coolant and brake-fluid condition", si: "Belt, hose, coolant සහ brake fluid තත්ත්වය" },
      { en: "Underbody inspection on the lift - leaks, bushes, boots", si: "Lift එකේ නංවලා යටින් බැලීම - leak, bush, boot" },
      { en: "Pre-trip and pre-purchase check-ups", si: "දුර ගමනකට කලින් සහ වාහනයක් ගන්න කලින් check up" },
      { en: "A written list of what needs doing now vs. later", si: "දැන් කරන්න ඕන දේ සහ පස්සේ කරන්න පුළුවන් දේ ලියලා දෙනවා" },
    ],
    symptom: {
      en: "Due for service, going on a long trip, or buying a used vehicle.",
      si: "Service එකේ කාලය ඇවිත්, දුර ගමනක් යනවා, නැත්නම් පාවිච්චි කරපු වාහනයක් ගන්නවා.",
    },
    image: "svc-service",
  },
];

/* ------------------------------------------------------------------ */

export const processSteps: { no: string; title: Bi; body: Bi }[] = [
  {
    no: "01",
    title: { en: "Call and describe it", si: "Call කරලා ප්‍රශ්නය කියන්න" },
    body: {
      en: "Tell us the noise, the smell, the warning light - whatever you noticed. We'll say straight away whether it's a drop-off job or something we can look at while you wait.",
      si: "හඬක්ද, ගඳක්ද, warning light එකක්ද - ඔබට දැනුණු දේ කියන්න. වාහනය තියලා යන්න ඕන වැඩක්ද, නැත්නම් ඔබ ඉන්නකොටම බලන්න පුළුවන් දෙයක්ද කියලා අපි එතනදීම කියනවා.",
    },
  },
  {
    no: "02",
    title: { en: "We diagnose first", si: "මුලින්ම fault එක හොයාගන්නවා" },
    body: {
      en: "Road test, scanner, and hands on the vehicle before any part is ordered. Guessing with parts is how bills get big.",
      si: "Part එකක් ගෙන්නන්න කලින් road test එකක්, scanner එක සහ අතින්ම බැලීමක්. Part මාරු කරමින් අනුමාන කරන එකෙන් තමයි bill එක ලොකු වෙන්නේ.",
    },
  },
  {
    no: "03",
    title: { en: "You get the estimate", si: "Estimate එක ඔබට දෙනවා" },
    body: {
      en: "What's wrong, what it takes to fix, what the parts cost and how long it will hold. Nothing is opened up before you agree.",
      si: "වැරදිලා තියෙන්නේ මොකක්ද, හදන්න ඕන මොනවද, part වලට කීයක් යනවද, කොච්චර කල් යයිද. ඔබ එකඟ වෙනකම් කිසිම දෙයක් ගලවන්නේ නෑ.",
    },
  },
  {
    no: "04",
    title: { en: "We source the parts", si: "Part අපිම හොයාගන්නවා" },
    body: {
      en: "You don't have to run around Panchikawatta. We source them, and we'll tell you honestly when a genuine part is worth it and when a good aftermarket one will do.",
      si: "පංචිකාවත්තේ දුවන්න ඕන නෑ. Part අපිම හොයාගන්නවා. Genuine part එකක් වටිනවද, නැත්නම් හොඳ aftermarket එකකින් හරි යනවද කියලා අවංකව කියනවා.",
    },
  },
  {
    no: "05",
    title: { en: "Repair, test, hand over", si: "අලුත්වැඩියාව, test එක, බාරදීම" },
    body: {
      en: "The job is road-tested before you're called. When you collect it, we show you the old parts and explain what was done.",
      si: "ඔබට call කරන්න කලින් වාහනය පාරේ පදවලා test කරනවා. බාරගන්න එනකොට පරණ part පෙන්නලා, කරපු දේ පැහැදිලි කරනවා.",
    },
  },
];

export const vehicles: Bi[] = [
  { en: "Cars", si: "Car" },
  { en: "Vans", si: "Van" },
  { en: "SUVs & Jeeps", si: "SUV සහ Jeep" },
  { en: "Cabs & double cabs", si: "Cab සහ Double Cab" },
  { en: "Petrol", si: "Petrol" },
  { en: "Diesel", si: "Diesel" },
];

export const brands = [
  "Toyota",
  "Nissan",
  "Honda",
  "Mitsubishi",
  "Suzuki",
  "Mazda",
  "Subaru",
  "Isuzu",
  "Daihatsu",
  "Tata",
  "Micro",
  "Perodua",
];

/* Real Google reviews — text as left by the reviewer. */
export const reviews: {
  author: string;
  meta: string;
  stars: number;
  when: string;
  body: string;
}[] = [
  {
    author: "Upeksha Herath",
    meta: "Google review",
    stars: 5,
    when: "1 month ago",
    body: "I visited them because my vehicle's engine was overheating, and after trying a few other workshops that couldn't identify the real cause, I finally found the right place. They diagnosed the exact issue almost immediately, clearly explained what was causing the problem, and provided a fair and reasonable estimate before starting the repair.",
  },
  {
    author: "Thaunjana Mihiran",
    meta: "Local Guide · 150 reviews",
    stars: 4,
    when: "7 years ago",
    body: "Highly recommend place to repair your diesel or petrol vehicle. You do not need to look for spare parts as they do it for us. They have every tool and scanners. Price is a bit high for me but the quality of work its worth it.",
  },
  {
    author: "Ashokan R",
    meta: "Local Guide · 27 reviews",
    stars: 5,
    when: "4 years ago",
    body: "Professional workmanship. Gives good advice and vehicle repairs are done to high expectations.",
  },
  {
    author: "Studio Vimukthi",
    meta: "Local Guide · 92 reviews",
    stars: 5,
    when: "8 years ago",
    body: "Best Vehicle Repair Center. Nice customer service. Very talented staff.",
  },
  {
    author: "rakitha manchanayaka",
    meta: "Local Guide · 17 reviews",
    stars: 5,
    when: "8 years ago",
    body: "Best workshop in this area.",
  },
  {
    author: "sss sadis",
    meta: "Local Guide · 30 reviews",
    stars: 5,
    when: "6 years ago",
    body: "This is one of the repairing garages for Tata Nano - specialists.",
  },
];

export const galleryImages: { name: MediaName; alt: Bi }[] = [
  { name: "g-01", alt: { en: "A car up on the two-post lift being worked on", si: "Two-post lift එකේ නංවලා වැඩ කරන car එකක්" } },
  { name: "g-02", alt: { en: "Car raised on the lift for underbody and suspension work", si: "යටි සහ suspension වැඩට lift එකේ නංවපු car එකක්" } },
  { name: "g-03", alt: { en: "Van raised with wheels off for brake and suspension work", si: "Brake සහ suspension වැඩට wheel ගලවලා නංවපු van එකක්" } },
  { name: "g-04", alt: { en: "SUV lifted for underbody inspection", si: "යටින් බලන්න නංවපු SUV එකක්" } },
  { name: "g-05", alt: { en: "Underbody view of a vehicle on the lift", si: "Lift එකේ තියෙන වාහනයක යට පැත්ත" } },
  { name: "g-06", alt: { en: "Master mechanic working inside an engine bay", si: "Engine bay එක ඇතුළේ වැඩ කරන ප්‍රධාන mechanic" } },
  { name: "g-07", alt: { en: "Toyota Hiace van in the repair bay", si: "Repair bay එකේ Toyota Hiace van එකක්" } },
  { name: "g-08", alt: { en: "Engine internals exposed during an overhaul", si: "Overhaul එකකදී විවෘත කරපු engine එකේ ඇතුළ" } },
  { name: "g-09", alt: { en: "Injector rail and cylinder head close-up", si: "Injector rail සහ cylinder head එක ළඟින්" } },
  { name: "g-10", alt: { en: "Throttle body cleaned and ready to refit", si: "Clean කරලා ආපහු දාන්න සූදානම් throttle body එක" } },
  { name: "g-11", alt: { en: "Diesel injectors laid out with new gaskets", si: "අලුත් gasket එක්ක තියලා තියෙන diesel injector" } },
  { name: "g-12", alt: { en: "Covered work bays at the Ganemulla workshop", si: "ගනේමුල්ල වැඩපොළේ වහලය යට work bay" } },
  { name: "g-13", alt: { en: "Engine bay opened up for diagnosis", si: "Check කරන්න විවෘත කරපු engine bay එකක්" } },
  { name: "g-14", alt: { en: "Turbo engine bay under inspection", si: "පරීක්ෂා කරන turbo engine bay එකක්" } },
  { name: "g-15", alt: { en: "Hatchback up on the lift with a wheel off for suspension work", si: "Suspension වැඩක් සඳහා රෝදයක් ගලවා lift එකේ ඔසවා ඇති hatchback එකක්" } },
  { name: "g-17", alt: { en: "Customer vehicles waiting in the yard", si: "වැඩපොළේ රැඳිලා ඉන්න customer වාහන" } },
  { name: "g-19", alt: { en: "Vehicles parked in the yard beside the covered work bays", si: "වහලය යට work bay ළඟ වැඩපොළේ නවත්තලා තියෙන වාහන" } },
  { name: "g-18", alt: { en: "Suspension and drivetrain components from below", si: "යටින් පේන suspension සහ drivetrain කොටස්" } },
];

export const marqueeWords = [
  "ENGINE OVERHAUL",
  "Engine වැඩ",
  "BRAKES",
  "Brake System",
  "OVERHEATING",
  "Overheat වීම",
  "CLUTCH & GEARBOX",
  "Clutch සහ Gearbox",
  "SUSPENSION",
  "Suspension වැඩ",
  "SCANNER DIAGNOSIS",
  "Scanner පරීක්ෂාව",
  "INJECTORS",
  "Injector Testing",
  "FULL SERVICE",
  "Full Service",
];

/* ------------------------------------------------------------------ */

/*
 * The questions people actually ask on the phone before they drive over.
 * Every answer has to be defensible from what the rest of the page already
 * claims — this block is also emitted as FAQPage structured data, and made-up
 * detail there is worse than no detail at all.
 */
export const faqs: { q: Bi; a: Bi }[] = [
  {
    q: {
      en: "Where exactly is the workshop?",
      si: "වැඩපොළ තියෙන්නේ හරියටම කොහෙද?",
    },
    a: {
      en: "58/04, Pahala Yagoda, Ganemulla - in the Gampaha District, a few minutes from Ganemulla town and an easy run from Gampaha, Yagoda, Kadawatha, Ja-Ela and Nittambuwa. The Google Plus code is 3X5G+XC Ganemulla, and the map on this page opens turn-by-turn directions.",
      si: "58/04, පහල යාගොඩ, ගනේමුල්ල - ගම්පහ දිස්ත්‍රික්කයේ, ගනේමුල්ල නගරයට විනාඩි කිහිපයයි. ගම්පහ, යාගොඩ, කඩවත, ජා-ඇල සහ නිට්ටඹුව ඉඳන් ලේසියෙන් එන්න පුළුවන්. Google Plus code එක 3X5G+XC Ganemulla. මේ පිටුවේ map එකෙන් directions ගන්න පුළුවන්.",
    },
  },
  {
    q: {
      en: "Do I need an appointment?",
      si: "කලින් appointment එකක් ගන්න ඕනද?",
    },
    a: {
      en: "No. Drive in during working hours and we will look at the vehicle. A call first still helps for bigger jobs - we will tell you straight away whether it is something to leave with us or something we can check while you wait.",
      si: "නෑ. වැඩ කරන වෙලාවට කෙළින්ම එන්න, වාහනය බලනවා. ලොකු වැඩකට නම් කලින් call එකක් දුන්නොත් හොඳයි - වාහනය තියලා යන්න ඕන වැඩක්ද, නැත්නම් ඔබ ඉන්නකොටම බලන්න පුළුවන් දෙයක්ද කියලා එතනදීම කියනවා.",
    },
  },
  {
    q: {
      en: "What kind of vehicles do you repair?",
      si: "මොන වගේ වාහනද හදන්නේ?",
    },
    a: {
      en: "Light vehicles - cars, vans, SUVs and jeeps, cabs and double cabs, petrol and diesel. Toyota, Nissan, Honda, Mitsubishi, Suzuki, Mazda, Subaru, Isuzu, Daihatsu, Tata, Micro and Perodua are all regulars in the yard.",
      si: "Light vehicle - car, van, SUV සහ jeep, cab සහ double cab, petrol සහ diesel දෙකම. Toyota, Nissan, Honda, Mitsubishi, Suzuki, Mazda, Subaru, Isuzu, Daihatsu, Tata, Micro සහ Perodua නිතරම වැඩපොළේ තියෙනවා.",
    },
  },
  {
    q: {
      en: "Will I know the cost before the work starts?",
      si: "වැඩ පටන් ගන්න කලින් වියදම දැනගන්න පුළුවන්ද?",
    },
    a: {
      en: "Yes. The vehicle is diagnosed first - road test, scanner, hands on it - and then you get the estimate: what is wrong, what it takes to fix, what the parts cost and how long it will hold. Nothing is opened up before you agree to it.",
      si: "ඔව්. මුලින්ම fault එක හොයාගන්නවා - road test එකක්, scanner එක, අතින්ම බැලීමක්. ඊට පස්සේ estimate එක දෙනවා: වැරදිලා තියෙන්නේ මොකක්ද, හදන්න ඕන මොනවද, part වලට කීයක් යනවද, කොච්චර කල් යයිද. ඔබ එකඟ වෙනකම් කිසිම දෙයක් ගලවන්නේ නෑ.",
    },
  },
  {
    q: {
      en: "Do I have to find the spare parts myself?",
      si: "Part මමම හොයාගන්න ඕනද?",
    },
    a: {
      en: "No - we source them. You do not have to run around Panchikawatta. We will also tell you honestly when a genuine part is worth the money and when a good aftermarket one will do the same job.",
      si: "නෑ - part අපිම හොයාගන්නවා. පංචිකාවත්තේ දුවන්න ඕන නෑ. Genuine part එකක් සල්ලි වටිනවද, නැත්නම් හොඳ aftermarket එකකින් හරි යනවද කියලත් අවංකව කියනවා.",
    },
  },
  {
    q: {
      en: "My vehicle keeps overheating and nobody has found the cause. Can you?",
      si: "වාහනය නිතරම overheat වෙනවා, හේතුව කාටවත් හොයාගන්න බැරි වුණා. පුළුවන්ද?",
    },
    a: {
      en: "That is one of the most common reasons vehicles arrive here after being somewhere else. Overheating is a symptom, not a fault - the radiator, thermostat, water pump, fan circuit, pressure cap and head gasket are all tested before anything is replaced, so you are not paying for parts that were never the problem.",
      si: "වෙන තැනකට ගිහින් මෙතනට එන වාහනවල නිතරම එන ප්‍රශ්නයක් තමයි ඒක. Overheat වීම කියන්නේ ලක්ෂණයක් මිසක් fault එක නෙවෙයි - radiator, thermostat, water pump, fan circuit, pressure cap සහ head gasket ඔක්කොම test කරලා තමයි මොනවහරි මාරු කරන්නේ. ප්‍රශ්නය නොවුණු part වලට සල්ලි යන්නේ නෑ.",
    },
  },
  {
    q: {
      en: "Do you do computer scanning and fault-code diagnosis?",
      si: "Computer scanning සහ fault code පරීක්ෂාව කරනවද?",
    },
    a: {
      en: "Yes - scanner, live data and fault-code tracing, on petrol and diesel. A code only says where to start looking, so the wiring, earths and sensors are still traced by hand before anything is condemned.",
      si: "ඔව් - scanner එක, live data සහ fault code හොයාගැනීම, petrol සහ diesel දෙකටම. Code එකකින් කියවෙන්නේ කොහෙන් හොයන්න පටන් ගන්නද කියන එක විතරයි. Wiring, earth සහ sensor අතින්ම check කරලා තමයි තීරණයකට එන්නේ.",
    },
  },
  {
    q: {
      en: "Can you check a used vehicle before I buy it?",
      si: "පාවිච්චි කරපු වාහනයක් ගන්න කලින් check කරලා දෙන්න පුළුවන්ද?",
    },
    a: {
      en: "Yes. A pre-purchase check-up puts the vehicle on the lift for an underbody look - leaks, bushes, boots, brakes and engine condition - and you get a written list of what needs doing now and what can wait. The same check is worth doing before a long trip.",
      si: "ඔව්. Lift එකේ නංවලා යටින් බලනවා - leak, bush, boot, brake සහ engine එකේ තත්ත්වය. දැන් කරන්න ඕන දේ සහ පස්සේ කරන්න පුළුවන් දේ ලියලා දෙනවා. දුර ගමනකට කලින්ත් මේ check එක කරගන්න එක වටිනවා.",
    },
  },
  {
    q: {
      en: "When are you open?",
      si: "විවෘත වෙලාවන් මොනවද?",
    },
    a: {
      en: "Monday to Saturday, 8.30 AM to 5.00 PM. Closed on Sundays. The banner at the top of this page shows whether the workshop is open right now, in Sri Lankan time.",
      si: "සඳුදා ඉඳන් සෙනසුරාදා දක්වා, පෙ.ව 8.30 සිට ප.ව 5.00 දක්වා. ඉරිදා වසා ඇත. මේ පිටුවේ උඩම තියෙන banner එකෙන් දැන් වැඩපොළ විවෘතද කියලා ලංකාවේ වෙලාවෙන් පෙන්නනවා.",
    },
  },
];
