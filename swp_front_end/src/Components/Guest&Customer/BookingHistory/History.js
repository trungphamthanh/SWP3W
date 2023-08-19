const DoctorOptions = [
    "Brian Holmes D.M.D.",
    "Justin Linton D.D.S.",
    "Travis Alcorn D.D.S",
    "Emily Free"
  ];
  
  const ServiceOptions = [
    "Bonding & White Filing",
    "Bridges",
    "Cleaning",
    "Cosmetic Dentistry",
    "Crowns",
    "Dentures",
    "Endodontics (Route Canal)",
    "Exams",
    "Hygeine & Periodontal Health",
    "Implants",
    "Inlays & Onlays",
    "Night Guards",
    "Onthodontics",
    "Pediatric",
    "Periodontic"
  ];
  
  const getRandomElement = (options) => {
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
  };
  
  export const History = Array.from({ length: 10 }, () => ({
    date: "2023-08-18", // Replace with actual date generation logic
    slot: `Slot ${Math.floor(Math.random() * 5) + 1}`,
    doctor: getRandomElement(DoctorOptions),
    service1: getRandomElement(ServiceOptions),
    service2: getRandomElement(ServiceOptions)
  }));