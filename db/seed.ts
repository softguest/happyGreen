// src/db/seed.ts
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { greenSkills, learningPathways, learningModules, badges } from "../config/schema";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

async function seed() {
  console.log("🌱 Seeding GreenSkill Up database...\n");

  // ==========================================
  // GREEN SKILLS
  // ==========================================
  console.log("📗 Inserting green skills...");

  const skills = await db
    .insert(greenSkills)
    .values([
      // === AGRICULTURE ===
      {
        name: "Composting & Organic Fertilizer Production",
        category: "agriculture",
        description:
          "Learn to convert organic waste into nutrient-rich compost and organic fertilizer for farming. This skill reduces dependency on chemical fertilizers while managing household and farm waste.",
        shortDescription: "Turn waste into farm gold",
        difficulty: "beginner",
        estimatedDuration: "2 weeks",
        requiredResources: ["land", "tools"],
        applicableRegions: [],
        marketPotential: "high",
        climateBenefit: "Reduces methane emissions from waste decomposition and improves soil carbon sequestration",
        icon: "Sprout",
      },
      {
        name: "Climate-Smart Farming Techniques",
        category: "agriculture",
        description:
          "Master farming techniques that increase productivity while building resilience to climate change. Includes mulching, intercropping, crop rotation, and drought-resistant varieties suited to Cameroon.",
        shortDescription: "Farm smarter in changing climates",
        difficulty: "intermediate",
        estimatedDuration: "4 weeks",
        requiredResources: ["land", "tools", "water_access"],
        applicableRegions: [],
        marketPotential: "high",
        climateBenefit: "Improves food security and reduces vulnerability to climate shocks",
        icon: "Sprout",
      },
      {
        name: "Drip Irrigation Installation",
        category: "agriculture",
        description:
          "Learn to design and install low-cost drip irrigation systems that save up to 60% more water than traditional watering. Ideal for dry-season farming in northern Cameroon.",
        shortDescription: "Save water, grow more",
        difficulty: "intermediate",
        estimatedDuration: "2 weeks",
        requiredResources: ["land", "small_capital", "water_access"],
        applicableRegions: ["far_north", "north", "adamawa"],
        marketPotential: "high",
        climateBenefit: "Significantly reduces water usage in agriculture",
        icon: "Droplets",
      },
      {
        name: "Urban Farming & Container Gardening",
        category: "agriculture",
        description:
          "Grow food in small urban spaces using containers, sacks, and vertical gardens. Perfect for youths in cities like Douala and Yaoundé with limited land access.",
        shortDescription: "Grow food anywhere in the city",
        difficulty: "beginner",
        estimatedDuration: "2 weeks",
        requiredResources: ["small_capital"],
        applicableRegions: ["centre", "littoral", "west"],
        marketPotential: "medium",
        climateBenefit: "Reduces food transport emissions and urban heat island effect",
        icon: "Sprout",
      },
      {
        name: "Agroforestry & Tree Nursery Management",
        category: "agriculture",
        description:
          "Combine tree growing with crop farming to improve yields, protect soil, and generate income from timber and fruit trees. Includes nursery setup for selling seedlings.",
        shortDescription: "Plant trees, grow income",
        difficulty: "intermediate",
        estimatedDuration: "4 weeks",
        requiredResources: ["land", "small_capital", "water_access"],
        applicableRegions: [],
        marketPotential: "high",
        climateBenefit: "Carbon sequestration and biodiversity conservation",
        icon: "Sprout",
      },
      // === WASTE MANAGEMENT ===
      {
        name: "Plastic Waste Recycling & Upcycling",
        category: "waste_management",
        description:
          "Learn to collect, sort, and transform plastic waste into useful products like paving blocks, bags, and crafts. A lucrative business opportunity in Cameroon's growing cities.",
        shortDescription: "Turn plastic trash into cash",
        difficulty: "beginner",
        estimatedDuration: "3 weeks",
        requiredResources: ["small_capital", "storage"],
        applicableRegions: [],
        marketPotential: "high",
        climateBenefit: "Diverts plastic waste from landfills and waterways",
        icon: "Recycle",
      },
      {
        name: "Community Waste Collection Business",
        category: "waste_management",
        description:
          "Set up a neighborhood waste collection service with sorting and proper disposal. High demand in urban areas where municipal waste services are insufficient.",
        shortDescription: "Clean communities, earn income",
        difficulty: "beginner",
        estimatedDuration: "2 weeks",
        requiredResources: ["small_capital", "transport", "network"],
        applicableRegions: ["centre", "littoral", "west", "southwest"],
        marketPotential: "high",
        climateBenefit: "Reduces illegal dumping and environmental pollution",
        icon: "Recycle",
      },
      {
        name: "Biogas Production from Organic Waste",
        category: "waste_management",
        description:
          "Build small-scale biogas digesters to convert animal manure and organic waste into cooking gas and fertilizer. Saves money on fuel and reduces deforestation.",
        shortDescription: "Cook with waste, save forests",
        difficulty: "advanced",
        estimatedDuration: "4 weeks",
        requiredResources: ["land", "medium_capital", "tools"],
        applicableRegions: [],
        marketPotential: "medium",
        climateBenefit: "Reduces methane emissions and replaces wood fuel",
        icon: "Recycle",
      },
      // === RENEWABLE ENERGY ===
      {
        name: "Solar Panel Installation & Maintenance",
        category: "renewable_energy",
        description:
          "Learn to install, wire, and maintain small solar systems for homes and businesses. High demand across Cameroon, especially in areas with unreliable grid power.",
        shortDescription: "Power homes with sunlight",
        difficulty: "intermediate",
        estimatedDuration: "4 weeks",
        requiredResources: ["tools", "medium_capital"],
        applicableRegions: [],
        marketPotential: "high",
        climateBenefit: "Displaces fossil fuel-based electricity generation",
        icon: "Sun",
      },
      {
        name: "Energy-Efficient Cookstove Production",
        category: "renewable_energy",
        description:
          "Build and sell improved cookstoves that use 50-70% less firewood than traditional three-stone fires. Reduces deforestation and indoor air pollution.",
        shortDescription: "Build stoves that save forests",
        difficulty: "beginner",
        estimatedDuration: "2 weeks",
        requiredResources: ["small_capital", "tools"],
        applicableRegions: [],
        marketPotential: "high",
        climateBenefit: "Reduces deforestation and black carbon emissions",
        icon: "Sun",
      },
      {
        name: "Biomass Briquette Production",
        category: "renewable_energy",
        description:
          "Convert agricultural waste (sawdust, coconut shells, corn cobs) into fuel briquettes. A clean alternative to charcoal with strong market demand.",
        shortDescription: "Make clean fuel from farm waste",
        difficulty: "beginner",
        estimatedDuration: "2 weeks",
        requiredResources: ["small_capital", "tools", "storage"],
        applicableRegions: [],
        marketPotential: "high",
        climateBenefit: "Reduces deforestation by providing charcoal alternative",
        icon: "Sun",
      },
      // === WATER CONSERVATION ===
      {
        name: "Rainwater Harvesting Systems",
        category: "water_conservation",
        description:
          "Design and install rainwater collection systems for homes, schools, and farms. Critical skill in areas facing water scarcity, especially during dry seasons.",
        shortDescription: "Capture rain, secure water supply",
        difficulty: "intermediate",
        estimatedDuration: "2 weeks",
        requiredResources: ["small_capital", "tools"],
        applicableRegions: [],
        marketPotential: "medium",
        climateBenefit: "Reduces pressure on groundwater and provides drought resilience",
        icon: "Droplets",
      },
      {
        name: "Water Purification Techniques",
        category: "water_conservation",
        description:
          "Learn affordable water purification methods including bio-sand filters, solar disinfection (SODIS), and ceramic filters. Essential for communities without treated water.",
        shortDescription: "Make water safe to drink",
        difficulty: "beginner",
        estimatedDuration: "2 weeks",
        requiredResources: ["small_capital"],
        applicableRegions: [],
        marketPotential: "medium",
        climateBenefit: "Reduces waterborne diseases and energy used for boiling water",
        icon: "Droplets",
      },
    ])
    .returning();

  console.log(`  ✅ Inserted ${skills.length} green skills\n`);

  // ==========================================
  // LEARNING PATHWAYS (for first 3 skills)
  // ==========================================
  console.log("📘 Inserting learning pathways...");
  

  // ✅ Create a map for fast lookup
  const skillMap = Object.fromEntries(
    skills.map((s) => [s.name, s])
  );

  // ✅ Define all pathways using skillName instead of manual find()
const pathwaysData = [
  {
    skillName: "Composting & Organic Fertilizer Production",
    title: "Composting Masterclass: From Waste to Wealth",
    description:
      "A complete beginner-friendly pathway to start composting at home or commercially.",
    estimatedHours: 5,
    totalModules: 5,
    difficulty: "beginner",
    learningOutcomes: [
      "Understand the composting process",
      "Set up a compost system",
      "Troubleshoot problems",
      "Sell organic fertilizer",
    ],
    isPublished: true,
  },
  {
    skillName: "Plastic Waste Recycling & Upcycling",
    title: "Plastic Recycling Business Starter",
    description:
      "Learn how to turn plastic waste into valuable products and income.",
    estimatedHours: 7,
    totalModules: 6,
    difficulty: "beginner",
    learningOutcomes: [
      "Identify plastic types",
      "Set up collection",
      "Create recycled products",
      "Start a business",
    ],
    isPublished: true,
  },
  {
    skillName: "Energy-Efficient Cookstove Production",
    title: "Build & Sell Improved Cookstoves",
    description:
      "Step-by-step guide to building and selling efficient cookstoves.",
    estimatedHours: 4,
    totalModules: 4,
    difficulty: "beginner",
    learningOutcomes: [
      "Understand efficiency principles",
      "Build stoves",
      "Test performance",
      "Sell locally",
    ],
    isPublished: true,
  },

  // 🔥 ADD ALL OTHER SKILLS HERE
  {
    skillName: "Climate-Smart Farming Techniques",
    title: "Climate-Smart Farming Mastery",
    description:
      "Learn resilient farming techniques for changing climates.",
    estimatedHours: 6,
    totalModules: 5,
    difficulty: "intermediate",
    learningOutcomes: [
      "Understand climate risks",
      "Apply smart farming methods",
      "Improve soil health",
      "Increase yields sustainably",
    ],
    isPublished: true,
  },
  {
    skillName: "Drip Irrigation Installation",
    title: "Drip Irrigation System Builder",
    description:
      "Design and install water-efficient irrigation systems.",
    estimatedHours: 5,
    totalModules: 5,
    difficulty: "intermediate",
    learningOutcomes: [
      "Understand irrigation systems",
      "Install drip systems",
      "Maintain systems",
      "Offer irrigation services",
    ],
    isPublished: true,
  },
    {
      skillName: "Urban Farming & Container Gardening",
      title: "Urban Farming & Container Gardening",
      description: "Grow food in limited spaces using creative techniques.",
      estimatedHours: 4,
      totalModules: 5,
      difficulty: "beginner",
      learningOutcomes: [
        "Set up container gardens",
        "Grow vegetables in small spaces",
        "Use vertical farming",
        "Sell urban produce"
      ],
      isPublished: true,
    },
    {
      skillName: "Agroforestry & Tree Nursery Management",
      title: "Agroforestry & Tree Nursery Business",
      description: "Combine farming and tree planting for profit and sustainability.",
      estimatedHours: 6,
      totalModules: 6,
      difficulty: "intermediate",
      learningOutcomes: [
        "Set up a tree nursery",
        "Grow and manage seedlings",
        "Integrate trees into farms",
        "Sell seedlings and timber products"
      ],
      isPublished: true,
    },
    {
      skillName: "Plastic Waste Recycling & Upcycling",
      title: "Waste Collection & Recycling Business",
      description: "Build a profitable waste collection service in your community.",
      estimatedHours: 5,
      totalModules: 5,
      difficulty: "beginner",
      learningOutcomes: [
        "Organize waste collection systems",
        "Find customers",
        "Price services",
        "Scale operations"
      ],
      isPublished: true,
    },
    {
      skillName: "Solar Panel Installation & Maintenance",
      title: "Solar Installation & Maintenance Pro",
      description: "Install and maintain solar systems for homes and businesses.",
      estimatedHours: 8,
      totalModules: 6,
      difficulty: "intermediate",
      learningOutcomes: [
        "Understand solar systems",
        "Install panels safely",
        "Wire systems",
        "Offer solar services"
      ],
      isPublished: true,
    },
    {
      skillName: "Biomass Briquette Production",
      title: "Biomass Briquette Production Business",
      description: "Turn agricultural waste into clean fuel products.",
      estimatedHours: 4,
      totalModules: 5,
      difficulty: "beginner",
      learningOutcomes: [
        "Produce briquettes",
        "Source raw materials",
        "Package products",
        "Sell to households and businesses"
      ],
      isPublished: true,
    },
    {
      skillName: "Rainwater Harvesting Systems",
      title: "Rainwater Harvesting Systems",
      description: "Capture and store rainwater for homes and farms.",
      estimatedHours: 4,
      totalModules: 5,
      difficulty: "intermediate",
      learningOutcomes: [
        "Design systems",
        "Install tanks and gutters",
        "Maintain systems",
        "Offer installation services"
      ],
      isPublished: true,
    },
    {
      skillName: "Water Purification Techniques",
      title: "Water Purification & Safe Water Solutions",
      description: "Provide clean and safe drinking water using low-cost methods.",
      estimatedHours: 4,
      totalModules: 5,
      difficulty: "beginner",
      learningOutcomes: [
        "Build filters",
        "Use solar disinfection",
        "Ensure safe water",
        "Sell purification solutions"
      ],
      isPublished: true,
    }
];

  // ✅ Insert with automatic skillId mapping
const pathways = await db
  .insert(learningPathways)
  .values(
    pathwaysData.map((p) => {
      const skill = skillMap[p.skillName];

      if (!skill) {
        throw new Error(`❌ Skill not found: ${p.skillName}`);
      }

      return {
        skillId: skill.id,
        title: p.title,
        description: p.description,
        estimatedHours: p.estimatedHours,
        totalModules: p.totalModules,
        difficulty: p.difficulty,
        learningOutcomes: p.learningOutcomes,
        isPublished: p.isPublished,
      };
    })
  )
  .returning();


  console.log(`  ✅ Inserted ${pathways.length} learning pathways\n`);

  // ==========================================
  // LEARNING MODULES (for Composting pathway)
  // ==========================================
  console.log("📄 Inserting learning modules...");

  // ✅ Map pathways by title
  const pathwayMap = Object.fromEntries(
    pathways.map((p) => [p.title, p])
  );
//   const modules = await db
//     .insert(learningModules)
//     .values([
//       {
//         pathwayId: compostPathway.id,
//         orderIndex: 1,
//         title: "What is Composting & Why It Matters",
//         content: `# What is Composting?

// Composting is nature's way of recycling. It's the process of breaking down organic materials — like food scraps, leaves, and animal manure — into a dark, rich soil amendment called **compost** or **humus**.

// ## Why Composting Matters in Cameroon

// 🌍 **Environmental Benefits:**
// - Reduces waste sent to landfills (up to 40% of household waste is organic)
// - Prevents methane emissions from rotting waste
// - Returns nutrients to the soil naturally

// 💰 **Economic Benefits:**
// - Saves money on chemical fertilizers
// - Creates a sellable product (organic fertilizer)
// - Low startup cost — you can begin with almost nothing

// 🌾 **Agricultural Benefits:**
// - Improves soil structure and water retention
// - Feeds beneficial soil organisms
// - Helps crops resist drought and disease

// ## The Science Behind Composting

// Composting works through **microbial decomposition**. Billions of tiny organisms (bacteria, fungi) eat organic matter and break it down. They need four things:

// 1. **Carbon** (browns) — dry leaves, cardboard, straw
// 2. **Nitrogen** (greens) — food scraps, fresh grass, manure
// 3. **Water** — moist like a wrung-out sponge
// 4. **Air** — oxygen for aerobic decomposition

// The ideal ratio is roughly **3 parts brown to 1 part green** by volume.`,
//         summary: "Understanding what composting is and why it matters for Cameroon's environment and economy",
//         practicalTask: "Walk around your neighborhood and identify 5 sources of organic waste that could be composted. Write them down.",
//         durationMinutes: 8,
//         contentType: "text",
//         quizQuestions: [
//           {
//             question: "What are the four things microorganisms need for composting?",
//             options: [
//               "Sun, sand, water, plastic",
//               "Carbon, nitrogen, water, air",
//               "Heat, cold, wind, rain",
//               "Soil, seeds, fertilizer, pesticide",
//             ],
//             correctIndex: 1,
//             explanation: "Composting microorganisms need carbon (browns), nitrogen (greens), water, and air (oxygen) to break down organic matter.",
//           },
//           {
//             question: "What is the ideal ratio of brown to green materials?",
//             options: ["1:1", "3:1", "1:3", "5:1"],
//             correctIndex: 1,
//             explanation: "The ideal ratio is roughly 3 parts brown (carbon) to 1 part green (nitrogen) by volume.",
//           },
//         ],
//       },
//       {
//         pathwayId: compostPathway.id,
//         orderIndex: 2,
//         title: "Setting Up Your First Compost System",
//         content: `# Setting Up Your First Compost System

// You don't need expensive equipment to start composting. Here are three methods suited to different situations in Cameroon:

// ## Method 1: Pit Composting (Rural Areas)
// Best for those with land access.

// **Steps:**
// 1. Dig a pit 1m × 1m × 0.5m deep
// 2. Add a layer of sticks at the bottom for drainage
// 3. Alternate layers of brown and green materials
// 4. Cover with banana leaves or a tarp
// 5. Turn every 2 weeks

// **Cost:** Free if you have basic tools

// ## Method 2: Bin Composting (Urban Areas)
// Best for small spaces in cities.

// **Steps:**
// 1. Get a large bucket, barrel, or build a wooden bin
// 2. Drill holes in the sides and bottom for air flow
// 3. Place on bricks for drainage
// 4. Add materials in layers (brown-green-brown)
// 5. Keep moist and turn weekly

// **Cost:** 2,000 - 5,000 XAF

// ## Method 3: Sack Composting (Minimal Space)
// Best for very small spaces or balconies.

// **Steps:**
// 1. Get a large rice or fertilizer sack
// 2. Punch small holes for air
// 3. Fill with alternating layers
// 4. Roll/shake the sack weekly to turn
// 5. Ready in 6-8 weeks

// **Cost:** 500 - 1,000 XAF

// ## What to Compost ✅
// - Fruit and vegetable scraps
// - Plantain peels
// - Corn cobs and husks
// - Dried leaves
// - Coffee grounds
// - Eggshells
// - Animal manure (cow, chicken, goat)
// - Sawdust

// ## What NOT to Compost ❌
// - Meat, fish, or dairy (attracts pests)
// - Plastic or metal
// - Diseased plants
// - Charcoal ash (in large amounts)
// - Human waste`,
//         summary: "Three practical composting methods for different living situations",
//         practicalTask: "Choose one composting method suitable for your situation and set it up this week. Take a photo of your setup.",
//         durationMinutes: 10,
//         contentType: "text",
//         quizQuestions: [
//           {
//             question: "Which composting method is best for someone living in an apartment in Douala?",
//             options: [
//               "Pit composting",
//               "Bin or sack composting",
//               "Large-scale windrow",
//               "Industrial composting",
//             ],
//             correctIndex: 1,
//             explanation: "Bin or sack composting works best in small urban spaces like apartments.",
//           },
//         ],
//       },
//       {
//         pathwayId: compostPathway.id,
//         orderIndex: 3,
//         title: "Managing Your Compost: Troubleshooting",
//         content: `# Managing Your Compost

// ## Signs of Healthy Compost
// - Earthy smell (like forest soil)
// - Warm in the center (40-65°C)
// - Gradually shrinking in volume
// - Dark brown color developing

// ## Common Problems & Solutions

// ### 🔴 Problem: Bad smell
// **Cause:** Too much green material or too wet
// **Fix:** Add more brown materials (dry leaves, cardboard), turn the pile, improve drainage

// ### 🔴 Problem: Not decomposing
// **Cause:** Too dry, not enough nitrogen, or pieces too large
// **Fix:** Add water, add green materials, chop materials smaller

// ### 🔴 Problem: Attracting flies/pests
// **Cause:** Exposed food scraps
// **Fix:** Always cover green materials with a brown layer, avoid meat/dairy

// ### 🔴 Problem: Too slow
// **Cause:** Low temperature, poor balance
// **Fix:** Make pile bigger (at least 1m³), ensure 3:1 ratio, turn more often

// ## Turning Schedule
// - **Weeks 1-4:** Turn every 3-4 days
// - **Weeks 5-8:** Turn weekly
// - **Weeks 9-12:** Turn every 2 weeks

// ## How to Know It's Ready
// Your compost is ready when:
// - Dark brown/black color
// - Crumbly texture
// - Sweet, earthy smell
// - Original materials unrecognizable
// - Cool temperature
// - Typically 8-12 weeks`,
//         summary: "How to maintain your compost and fix common problems",
//         practicalTask: "Check your compost system. Record the temperature (warm/cool), smell, and appearance. Identify if any troubleshooting is needed.",
//         durationMinutes: 8,
//         contentType: "text",
//         quizQuestions: [
//           {
//             question: "Your compost pile smells bad. What should you do?",
//             options: [
//               "Add more food scraps",
//               "Add more brown materials and turn the pile",
//               "Add water",
//               "Leave it alone",
//             ],
//             correctIndex: 1,
//             explanation: "A bad smell usually means too much nitrogen (greens) or too much moisture. Adding browns and turning fixes this.",
//           },
//         ],
//       },
//       {
//         pathwayId: compostPathway.id,
//         orderIndex: 4,
//         title: "Making Liquid Fertilizer & Compost Tea",
//         content: `# Liquid Fertilizer & Compost Tea

// Beyond solid compost, you can create liquid fertilizers that provide quick nutrition to plants.

// ## Compost Tea
// A nutrient-rich liquid made by soaking finished compost in water.

// **How to make it:**
// 1. Fill a sack or cloth bag with finished compost
// 2. Submerge in a bucket of water (ratio 1:5)
// 3. Let it soak for 3-7 days
// 4. Stir daily
// 5. Strain and dilute 1:10 before use
// 6. Apply to plant roots or spray on leaves

// ## Liquid Manure (Purin)
// Made from fresh animal manure — stronger than compost tea.

// **How to make it:**
// 1. Fill a barrel 1/4 with fresh manure (cow or chicken)
// 2. Add water to fill
// 3. Stir daily for 2-3 weeks
// 4. Strain
// 5. Dilute 1:10 for root application
// 6. Dilute 1:20 for leaf spray

// ## Plant-Based Liquid Fertilizer
// Made from nitrogen-rich plants.

// **Best plants to use in Cameroon:**
// - Tithonia (Mexican sunflower) — very common
// - Moringa leaves
// - Comfrey
// - Nettles

// **Method:**
// 1. Chop plants and fill a bucket halfway
// 2. Add water to cover
// 3. Cover loosely (gases need to escape)
// 4. Stir every 2 days
// 5. Ready in 2-3 weeks when dark and smelly
// 6. Strain and dilute 1:10

// ## Selling Your Products
// - 1 liter of compost tea: 200-500 XAF
// - 5 liters of liquid fertilizer: 1,000-2,500 XAF
// - Target: market gardeners, nurseries, urban farmers`,
//         summary: "Creating and selling liquid fertilizer products from compost",
//         practicalTask: "Make a batch of compost tea using available materials. Document your process and results after applying to plants.",
//         durationMinutes: 10,
//         contentType: "text",
//         quizQuestions: [
//           {
//             question: "What dilution ratio should you use when applying compost tea to plant roots?",
//             options: ["Undiluted", "1:2", "1:10", "1:100"],
//             correctIndex: 2,
//             explanation: "Compost tea should be diluted 1:10 (1 part tea to 10 parts water) for root application.",
//           },
//         ],
//       },
//       {
//         pathwayId: compostPathway.id,
//         orderIndex: 5,
//         title: "Starting Your Composting Business",
//         content: `# Starting Your Composting Business

// You've learned the skill — now let's turn it into income!

// ## Business Model Options

// ### Option 1: Sell Finished Compost
// - Package in 5kg, 10kg, 25kg bags
// - Price: 500-2,000 XAF per 5kg bag
// - Target: Home gardeners, urban farmers, nurseries

// ### Option 2: Composting Service
// - Collect organic waste from restaurants, markets, hotels
// - Charge a collection fee (monthly subscription)
// - Sell the resulting compost
// - Double income stream!

// ### Option 3: Training & Consulting
// - Teach others to compost
// - Charge for workshops
// - Set up systems for schools, hotels, organizations

// ## Starting Small: Your First 30 Days

// **Week 1:** Set up 3-5 compost systems
// **Week 2:** Approach 5 potential waste sources (restaurants, markets)
// **Week 3:** Create your first batch of packaged compost
// **Week 4:** Make your first sales at local markets

// ## Pricing Guide (Cameroon Market)
// | Product | Quantity | Price Range |
// |---------|----------|-------------|
// | Organic compost | 5kg bag | 500-1,500 XAF |
// | Organic compost | 25kg bag | 2,000-5,000 XAF |
// | Compost tea | 1 liter | 200-500 XAF |
// | Liquid fertilizer | 5 liters | 1,000-2,500 XAF |
// | Composting workshop | Per person | 2,000-5,000 XAF |

// ## Monthly Income Potential
// - **Small scale (home-based):** 15,000 - 40,000 XAF/month
// - **Medium scale (with collection):** 50,000 - 150,000 XAF/month
// - **Commercial scale:** 200,000+ XAF/month

// ## Marketing Tips
// 1. Start with neighbors and local WhatsApp groups
// 2. Offer free samples to first customers
// 3. Take before/after photos of plants using your compost
// 4. Partner with local farming groups
// 5. Brand your product with a simple name and clean packaging`,
//         summary: "Turning composting knowledge into a viable green business",
//         practicalTask: "Write a simple one-page business plan for a composting business in your area. Include: target customers, pricing, startup costs, and how you'll find your first 5 customers.",
//         durationMinutes: 12,
//         contentType: "text",
//         quizQuestions: [
//           {
//             question: "What is a 'double income stream' in a composting service business?",
//             options: [
//               "Working two jobs",
//               "Charging for waste collection AND selling the compost produced",
//               "Selling online and offline",
//               "Getting a loan and making sales",
//             ],
//             correctIndex: 1,
//             explanation: "A composting service can earn money from both the waste collection fee and from selling the finished compost — two revenue streams from one activity.",
//           },
//         ],
//       },
//     ])
//     .returning();

//   console.log(`  ✅ Inserted ${modules.length} learning modules\n`);


  function createModules(pathwayTitle: string, topics: string[]) {
    return topics.map((topic, index) => ({
      pathwayTitle,
      orderIndex: index + 1,
      title: topic,
      content: `# ${topic}

  ## Overview
  This module teaches you ${topic.toLowerCase()} in a practical and beginner-friendly way.

  ## Key Concepts
  - Understanding the basics
  - Practical application
  - Real-world examples in Cameroon

  ## Why It Matters
  This skill can help you generate income, improve sustainability, and build resilience in your community.`,
      summary: topic,
      practicalTask: `Apply what you learned in "${topic}" in your local environment.`,
      durationMinutes: 8 + index * 2,
      contentType: "text",
      quizQuestions: [
        {
          question: `What is the main goal of "${topic}"?`,
          options: [
            "To confuse learners",
            "To build practical skills",
            "To waste time",
            "To avoid work",
          ],
          correctIndex: 1,
          explanation: "Each module is designed to build real-world practical skills.",
        },
      ],
    }));
  }


  const modulesData = [
  // 🌱 COMPOSTING
  ...createModules("Composting Masterclass: From Waste to Wealth", [
    "Introduction to Composting",
    "Setting Up a Compost System",
    "Managing and Troubleshooting Compost",
    "Liquid Fertilizer Production",
    "Composting Business Guide",
  ]),

  // 🌾 CLIMATE SMART FARMING
  ...createModules("Climate-Smart Farming Mastery", [
    "Introduction to Climate-Smart Agriculture",
    "Soil Management Techniques",
    "Water Conservation Methods",
    "Crop Diversification Strategies",
    "Farming Business Optimization",
  ]),

  // 💧 DRIP IRRIGATION
  ...createModules("Drip Irrigation System Builder", [
    "Irrigation Basics",
    "System Design",
    "Installation Process",
    "Maintenance and Troubleshooting",
    "Irrigation Business Opportunities",
  ]),

  // 🏙️ URBAN FARMING
  ...createModules("Urban Farming & Container Gardening", [
    "Urban Farming Basics",
    "Container Gardening Setup",
    "Crop Selection",
    "Pest Control in Small Spaces",
    "Selling Urban Produce",
  ]),

  // 🌳 AGROFORESTRY
  ...createModules("Agroforestry & Tree Nursery Business", [
    "Introduction to Agroforestry",
    "Tree Nursery Setup",
    "Seedling Management",
    "Integrating Trees and Crops",
    "Tree-Based Business Models",
  ]),

  // ♻️ PLASTIC RECYCLING
  ...createModules("Plastic Recycling Business Starter", [
    "Understanding Plastic Types",
    "Waste Collection Systems",
    "Recycling Techniques",
    "Product Creation",
    "Recycling Business Setup",
  ]),

  // 🚛 WASTE COLLECTION
  ...createModules("Waste Collection & Recycling Business", [
    "Waste Management Basics",
    "Collection System Setup",
    "Customer Acquisition",
    "Operations Management",
    "Scaling the Business",
  ]),

  // 🔥 BIOGAS
  ...createModules("Biomass Briquette Production Business", [
    "Introduction to Biogas",
    "Digester Design",
    "Building a Biogas System",
    "Maintenance and Safety",
    "Biogas Business Opportunities",
  ]),

  // ☀️ SOLAR
  ...createModules("Solar Installation & Maintenance Pro", [
    "Solar Energy Basics",
    "Solar Components",
    "Installation Process",
    "Maintenance and Repair",
    "Solar Business Setup",
  ]),

  // 🔥 COOKSTOVES
  ...createModules("Build & Sell Improved Cookstoves", [
    "Cookstove Basics",
    "Materials and Design",
    "Building a Stove",
    "Testing Efficiency",
    "Selling Cookstoves",
  ]),

  // 🔋 BRIQUETTES
  ...createModules("Biomass Briquette Production Business", [
    "Introduction to Briquettes",
    "Raw Material Collection",
    "Production Process",
    "Drying and Packaging",
    "Selling Briquettes",
  ]),

  // 🌧️ RAINWATER
  ...createModules("Rainwater Harvesting Systems", [
    "Rainwater Basics",
    "System Design",
    "Installation",
    "Maintenance",
    "Water Business Opportunities",
  ]),

  // 🚰 WATER PURIFICATION
  ...createModules("Water Purification & Safe Water Solutions", [
    "Water Safety Basics",
    "Filtration Methods",
    "Solar Disinfection",
    "Building Filters",
    "Water Business Models",
  ]),
];

const modules = await db
  .insert(learningModules)
  .values(
    modulesData.map((m) => {
      const pathway = pathwayMap[m.pathwayTitle];

      if (!pathway) {
        throw new Error(`❌ Pathway not found: ${m.pathwayTitle}`);
      }

      return {
        pathwayId: pathway.id,
        orderIndex: m.orderIndex,
        title: m.title,
        content: m.content,
        summary: m.summary,
        practicalTask: m.practicalTask,
        durationMinutes: m.durationMinutes,
        contentType: m.contentType,
        quizQuestions: m.quizQuestions,
      };
    })
  )
  .returning();


  // ==========================================
  // BADGES
  // ==========================================
  console.log("🏅 Inserting badges...");

  const badgeEntries = await db
    .insert(badges)
    .values([
      {
        name: "Green Explorer",
        description: "Completed onboarding and profile setup",
        icon: "🌱",
        category: "learning",
        pointsAwarded: 10,
      },
      {
        name: "First Skill",
        description: "Saved your first green skill",
        icon: "🎯",
        category: "learning",
        pointsAwarded: 15,
      },
      {
        name: "Module Master",
        description: "Completed your first learning module",
        icon: "📗",
        category: "learning",
        pointsAwarded: 20,
      },
      {
        name: "Pathway Pioneer",
        description: "Completed a full learning pathway",
        icon: "🏆",
        category: "learning",
        pointsAwarded: 100,
      },
      {
        name: "Business Thinker",
        description: "Created your first green business plan",
        icon: "💡",
        category: "business",
        pointsAwarded: 50,
      },
      {
        name: "Impact Starter",
        description: "Logged your first environmental impact",
        icon: "🌍",
        category: "impact",
        pointsAwarded: 25,
      },
      {
        name: "Waste Warrior",
        description: "Logged 100kg of waste reduced",
        icon: "♻️",
        category: "impact",
        pointsAwarded: 75,
      },
      {
        name: "Tree Planter",
        description: "Logged planting 50 trees or seedlings",
        icon: "🌳",
        category: "impact",
        pointsAwarded: 75,
      },
    ])
    .returning();

  console.log(`  ✅ Inserted ${badgeEntries.length} badges\n`);

  console.log("✅ Seeding complete!");
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("❌ Seed failed:", err);
    process.exit(1);
  });