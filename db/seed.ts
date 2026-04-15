// src/db/seed.ts
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { greenSkills, learningPathways, learningModules, badges } from "../config/schema";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

async function seed() {
  console.log("🌱 Seeding GreenSkill Hub database...\n");

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

  const composting = skills.find(
    (s) => s.name === "Composting & Organic Fertilizer Production"
  )!;
  const plasticRecycling = skills.find(
    (s) => s.name === "Plastic Waste Recycling & Upcycling"
  )!;
  const cookstove = skills.find(
    (s) => s.name === "Energy-Efficient Cookstove Production"
  )!;
  const climateSmartFarming = skills.find(s => s.name === "Climate-Smart Farming Techniques")!;
  const dripIrrigation = skills.find(s => s.name === "Drip Irrigation Installation")!;
  const urbanFarming = skills.find(s => s.name === "Urban Farming & Container Gardening")!;
  const agroforestry = skills.find(s => s.name === "Agroforestry & Tree Nursery Management")!;
  const wasteCollection = skills.find(s => s.name === "Community Waste Collection Business")!;
  const biogas = skills.find(s => s.name === "Biogas Production from Organic Waste")!;
  const solarInstall = skills.find(s => s.name === "Solar Panel Installation & Maintenance")!;
  const biomassBriquettes = skills.find(s => s.name === "Biomass Briquette Production")!;
  const rainwaterHarvest = skills.find(s => s.name === "Rainwater Harvesting Systems")!;
  const waterPurification = skills.find(s => s.name === "Water Purification Techniques")!;

  const pathways = await db
    .insert(learningPathways)
    .values([
      {
        skillId: composting.id,
        title: "Composting Masterclass: From Waste to Wealth",
        description:
          "A complete beginner-friendly pathway to start composting at home or commercially. Learn science, methods, troubleshooting, and how to sell your compost.",
        estimatedHours: 5,
        totalModules: 5,
        difficulty: "beginner",
        learningOutcomes: [
          "Understand the composting process",
          "Set up a compost system",
          "Troubleshoot common problems",
          "Produce and sell organic fertilizer",
        ],
        isPublished: true,
      },
      {
        skillId: plasticRecycling.id,
        title: "Plastic Recycling Business Starter",
        description:
          "Learn how to identify, collect, sort, and transform plastic waste into marketable products. Includes business setup guidance.",
        estimatedHours: 7,
        totalModules: 6,
        difficulty: "beginner",
        learningOutcomes: [
          "Identify recyclable plastic types",
          "Set up a collection system",
          "Create products from recycled plastic",
          "Launch a recycling micro-business",
        ],
        isPublished: true,
      },
      {
        skillId: cookstove.id,
        title: "Build & Sell Improved Cookstoves",
        description:
          "Step-by-step guide to building energy-efficient cookstoves from local materials. Learn the science, construction, and sales strategies.",
        estimatedHours: 4,
        totalModules: 4,
        difficulty: "beginner",
        learningOutcomes: [
          "Understand cookstove efficiency principles",
          "Build a rocket stove from local materials",
          "Test and improve stove performance",
          "Market and sell to local communities",
        ],
        isPublished: true,
      },
       // === AGRICULTURE PATHWAYS ===
    {
      skillId: climateSmartFarming.id,
      title: "Climate-Smart Farming: Resilient Agriculture for Cameroon",
      description:
        "Master farming techniques that boost yields while adapting to climate change. Learn mulching, intercropping, drought-resistant crops, and soil conservation methods suited to Cameroon's diverse agro-ecological zones.",
      estimatedHours: 6,
      totalModules: 5,
      difficulty: "intermediate",
      learningOutcomes: [
        "Apply mulching and conservation tillage to retain soil moisture",
        "Design intercropping systems that maximize land use",
        "Select and plant drought-resistant crop varieties",
        "Implement crop rotation to improve soil health",
        "Monitor weather patterns and adjust farming practices",
      ],
      isPublished: true,
    },
    {
      skillId: dripIrrigation.id,
      title: "Low-Cost Drip Irrigation: Water-Smart Farming",
      description:
        "Design and install affordable drip irrigation systems using locally available materials. Save up to 60% water while increasing crop yields—perfect for dry-season farming in Northern Cameroon.",
      estimatedHours: 4,
      totalModules: 4,
      difficulty: "intermediate",
      learningOutcomes: [
        "Calculate water needs for different crops",
        "Source and assemble low-cost drip irrigation components",
        "Install and test a functional drip system",
        "Maintain and troubleshoot irrigation equipment",
      ],
      isPublished: true,
    },
    {
      skillId: urbanFarming.id,
      title: "Urban Farming Mastery: Grow Food in Small Spaces",
      description:
        "Transform balconies, rooftops, and small yards into productive food gardens. Learn container gardening, vertical growing, composting for urban settings, and how to sell surplus produce in city markets.",
      estimatedHours: 4,
      totalModules: 4,
      difficulty: "beginner",
      learningOutcomes: [
        "Select suitable crops for container and vertical gardening",
        "Build and fill productive growing containers from recycled materials",
        "Manage pests and nutrients in small-space gardens",
        "Market urban-grown produce to neighbors and local vendors",
      ],
      isPublished: true,
    },
    {
      skillId: agroforestry.id,
      title: "Agroforestry & Tree Nursery: Grow Trees, Grow Income",
      description:
        "Integrate trees with crops and livestock to improve soil, increase biodiversity, and create multiple income streams. Includes step-by-step nursery setup for selling high-demand seedlings.",
      estimatedHours: 6,
      totalModules: 5,
      difficulty: "intermediate",
      learningOutcomes: [
        "Design agroforestry systems for different farm sizes",
        "Propagate and care for fruit, timber, and nitrogen-fixing trees",
        "Manage a small tree nursery for commercial seedling sales",
        "Calculate economic returns from agroforestry investments",
      ],
      isPublished: true,
    },
    // === WASTE MANAGEMENT PATHWAYS ===
    {
      skillId: wasteCollection.id,
      title: "Community Waste Collection: Build a Clean Business",
      description:
        "Launch a neighborhood waste collection service with sorting, recycling partnerships, and proper disposal. High demand in urban Cameroon where municipal services are limited.",
      estimatedHours: 4,
      totalModules: 4,
      difficulty: "beginner",
      learningOutcomes: [
        "Map waste generation patterns in your community",
        "Set up collection routes and pricing models",
        "Partner with recyclers and disposal facilities",
        "Scale your service with simple business systems",
      ],
      isPublished: true,
    },
    {
      skillId: biogas.id,
      title: "Biogas Digesters: Turn Waste into Cooking Fuel",
      description:
        "Build and maintain small-scale biogas systems that convert animal manure and organic waste into clean cooking gas and liquid fertilizer. Reduce deforestation and save on fuel costs.",
      estimatedHours: 7,
      totalModules: 5,
      difficulty: "advanced",
      learningOutcomes: [
        "Understand anaerobic digestion science and safety",
        "Design and construct a fixed-dome or floating-drum digester",
        "Operate and maintain a biogas system for consistent gas production",
        "Use digestate as organic fertilizer for crops",
        "Troubleshoot common biogas system problems",
      ],
      isPublished: true,
    },
    // === RENEWABLE ENERGY PATHWAYS ===
    {
      skillId: solarInstall.id,
      title: "Solar Power Technician: Install & Maintain Small Systems",
      description:
        "Learn to size, wire, install, and maintain small solar PV systems for homes and small businesses. High demand across Cameroon, especially in off-grid and unreliable-grid areas.",
      estimatedHours: 8,
      totalModules: 6,
      difficulty: "intermediate",
      learningOutcomes: [
        "Calculate energy needs and size solar components correctly",
        "Wire panels, charge controllers, batteries, and inverters safely",
        "Install mounting systems for roofs and ground arrays",
        "Test, commission, and maintain solar installations",
        "Quote jobs and provide basic customer training",
      ],
      isPublished: true,
    },
    {
      skillId: biomassBriquettes.id,
      title: "Biomass Briquettes: Clean Fuel from Farm Waste",
      description:
        "Convert agricultural residues like sawdust, corn cobs, and coconut shells into high-quality fuel briquettes. A profitable, eco-friendly alternative to charcoal with strong market demand.",
      estimatedHours: 4,
      totalModules: 4,
      difficulty: "beginner",
      learningOutcomes: [
        "Identify and collect suitable biomass feedstocks",
        "Operate manual or motorized briquette presses",
        "Dry, package, and brand briquette products",
        "Market briquettes to households and small businesses",
      ],
      isPublished: true,
    },
    // === WATER CONSERVATION PATHWAYS ===
    {
      skillId: rainwaterHarvest.id,
      title: "Rainwater Harvesting: Secure Water for Homes & Farms",
      description:
        "Design and install rainwater collection systems using gutters, tanks, and filtration. Critical for water security in drought-prone areas and for reducing reliance on expensive water vendors.",
      estimatedHours: 4,
      totalModules: 4,
      difficulty: "intermediate",
      learningOutcomes: [
        "Calculate roof catchment area and storage needs",
        "Source and assemble gutters, first-flush diverters, and tanks",
        "Install simple filtration for non-potable uses",
        "Maintain systems and educate users on safe water handling",
      ],
      isPublished: true,
    },
    {
      skillId: waterPurification.id,
      title: "Affordable Water Purification: Safe Drinking Water for All",
      description:
        "Master low-cost water treatment methods including bio-sand filters, solar disinfection (SODIS), and ceramic filters. Essential for communities without access to treated water.",
      estimatedHours: 4,
      totalModules: 4,
      difficulty: "beginner",
      learningOutcomes: [
        "Test water quality using simple field methods",
        "Build and maintain a bio-sand filter",
        "Apply SODIS and other point-of-use treatment techniques",
        "Educate households on safe water storage and handling",
      ],
      isPublished: true,
    },
    ])
    .returning();

  console.log(`  ✅ Inserted ${pathways.length} learning pathways\n`);

  // ==========================================
  // LEARNING MODULES (for Composting pathway)
  // ==========================================
  console.log("📄 Inserting learning modules...");

  const compostPathway = pathways.find(
    (p) => p.title === "Composting Masterclass: From Waste to Wealth"
  )!;

  const modules = await db
    .insert(learningModules)
    .values([
      {
        pathwayId: compostPathway.id,
        orderIndex: 1,
        title: "What is Composting & Why It Matters",
        content: `# What is Composting?

Composting is nature's way of recycling. It's the process of breaking down organic materials — like food scraps, leaves, and animal manure — into a dark, rich soil amendment called **compost** or **humus**.

## Why Composting Matters in Cameroon

🌍 **Environmental Benefits:**
- Reduces waste sent to landfills (up to 40% of household waste is organic)
- Prevents methane emissions from rotting waste
- Returns nutrients to the soil naturally

💰 **Economic Benefits:**
- Saves money on chemical fertilizers
- Creates a sellable product (organic fertilizer)
- Low startup cost — you can begin with almost nothing

🌾 **Agricultural Benefits:**
- Improves soil structure and water retention
- Feeds beneficial soil organisms
- Helps crops resist drought and disease

## The Science Behind Composting

Composting works through **microbial decomposition**. Billions of tiny organisms (bacteria, fungi) eat organic matter and break it down. They need four things:

1. **Carbon** (browns) — dry leaves, cardboard, straw
2. **Nitrogen** (greens) — food scraps, fresh grass, manure
3. **Water** — moist like a wrung-out sponge
4. **Air** — oxygen for aerobic decomposition

The ideal ratio is roughly **3 parts brown to 1 part green** by volume.`,
        summary: "Understanding what composting is and why it matters for Cameroon's environment and economy",
        practicalTask: "Walk around your neighborhood and identify 5 sources of organic waste that could be composted. Write them down.",
        durationMinutes: 8,
        contentType: "text",
        quizQuestions: [
          {
            question: "What are the four things microorganisms need for composting?",
            options: [
              "Sun, sand, water, plastic",
              "Carbon, nitrogen, water, air",
              "Heat, cold, wind, rain",
              "Soil, seeds, fertilizer, pesticide",
            ],
            correctIndex: 1,
            explanation: "Composting microorganisms need carbon (browns), nitrogen (greens), water, and air (oxygen) to break down organic matter.",
          },
          {
            question: "What is the ideal ratio of brown to green materials?",
            options: ["1:1", "3:1", "1:3", "5:1"],
            correctIndex: 1,
            explanation: "The ideal ratio is roughly 3 parts brown (carbon) to 1 part green (nitrogen) by volume.",
          },
        ],
      },
      {
        pathwayId: compostPathway.id,
        orderIndex: 2,
        title: "Setting Up Your First Compost System",
        content: `# Setting Up Your First Compost System

You don't need expensive equipment to start composting. Here are three methods suited to different situations in Cameroon:

## Method 1: Pit Composting (Rural Areas)
Best for those with land access.

**Steps:**
1. Dig a pit 1m × 1m × 0.5m deep
2. Add a layer of sticks at the bottom for drainage
3. Alternate layers of brown and green materials
4. Cover with banana leaves or a tarp
5. Turn every 2 weeks

**Cost:** Free if you have basic tools

## Method 2: Bin Composting (Urban Areas)
Best for small spaces in cities.

**Steps:**
1. Get a large bucket, barrel, or build a wooden bin
2. Drill holes in the sides and bottom for air flow
3. Place on bricks for drainage
4. Add materials in layers (brown-green-brown)
5. Keep moist and turn weekly

**Cost:** 2,000 - 5,000 XAF

## Method 3: Sack Composting (Minimal Space)
Best for very small spaces or balconies.

**Steps:**
1. Get a large rice or fertilizer sack
2. Punch small holes for air
3. Fill with alternating layers
4. Roll/shake the sack weekly to turn
5. Ready in 6-8 weeks

**Cost:** 500 - 1,000 XAF

## What to Compost ✅
- Fruit and vegetable scraps
- Plantain peels
- Corn cobs and husks
- Dried leaves
- Coffee grounds
- Eggshells
- Animal manure (cow, chicken, goat)
- Sawdust

## What NOT to Compost ❌
- Meat, fish, or dairy (attracts pests)
- Plastic or metal
- Diseased plants
- Charcoal ash (in large amounts)
- Human waste`,
        summary: "Three practical composting methods for different living situations",
        practicalTask: "Choose one composting method suitable for your situation and set it up this week. Take a photo of your setup.",
        durationMinutes: 10,
        contentType: "text",
        quizQuestions: [
          {
            question: "Which composting method is best for someone living in an apartment in Douala?",
            options: [
              "Pit composting",
              "Bin or sack composting",
              "Large-scale windrow",
              "Industrial composting",
            ],
            correctIndex: 1,
            explanation: "Bin or sack composting works best in small urban spaces like apartments.",
          },
        ],
      },
      {
        pathwayId: compostPathway.id,
        orderIndex: 3,
        title: "Managing Your Compost: Troubleshooting",
        content: `# Managing Your Compost

## Signs of Healthy Compost
- Earthy smell (like forest soil)
- Warm in the center (40-65°C)
- Gradually shrinking in volume
- Dark brown color developing

## Common Problems & Solutions

### 🔴 Problem: Bad smell
**Cause:** Too much green material or too wet
**Fix:** Add more brown materials (dry leaves, cardboard), turn the pile, improve drainage

### 🔴 Problem: Not decomposing
**Cause:** Too dry, not enough nitrogen, or pieces too large
**Fix:** Add water, add green materials, chop materials smaller

### 🔴 Problem: Attracting flies/pests
**Cause:** Exposed food scraps
**Fix:** Always cover green materials with a brown layer, avoid meat/dairy

### 🔴 Problem: Too slow
**Cause:** Low temperature, poor balance
**Fix:** Make pile bigger (at least 1m³), ensure 3:1 ratio, turn more often

## Turning Schedule
- **Weeks 1-4:** Turn every 3-4 days
- **Weeks 5-8:** Turn weekly
- **Weeks 9-12:** Turn every 2 weeks

## How to Know It's Ready
Your compost is ready when:
- Dark brown/black color
- Crumbly texture
- Sweet, earthy smell
- Original materials unrecognizable
- Cool temperature
- Typically 8-12 weeks`,
        summary: "How to maintain your compost and fix common problems",
        practicalTask: "Check your compost system. Record the temperature (warm/cool), smell, and appearance. Identify if any troubleshooting is needed.",
        durationMinutes: 8,
        contentType: "text",
        quizQuestions: [
          {
            question: "Your compost pile smells bad. What should you do?",
            options: [
              "Add more food scraps",
              "Add more brown materials and turn the pile",
              "Add water",
              "Leave it alone",
            ],
            correctIndex: 1,
            explanation: "A bad smell usually means too much nitrogen (greens) or too much moisture. Adding browns and turning fixes this.",
          },
        ],
      },
      {
        pathwayId: compostPathway.id,
        orderIndex: 4,
        title: "Making Liquid Fertilizer & Compost Tea",
        content: `# Liquid Fertilizer & Compost Tea

Beyond solid compost, you can create liquid fertilizers that provide quick nutrition to plants.

## Compost Tea
A nutrient-rich liquid made by soaking finished compost in water.

**How to make it:**
1. Fill a sack or cloth bag with finished compost
2. Submerge in a bucket of water (ratio 1:5)
3. Let it soak for 3-7 days
4. Stir daily
5. Strain and dilute 1:10 before use
6. Apply to plant roots or spray on leaves

## Liquid Manure (Purin)
Made from fresh animal manure — stronger than compost tea.

**How to make it:**
1. Fill a barrel 1/4 with fresh manure (cow or chicken)
2. Add water to fill
3. Stir daily for 2-3 weeks
4. Strain
5. Dilute 1:10 for root application
6. Dilute 1:20 for leaf spray

## Plant-Based Liquid Fertilizer
Made from nitrogen-rich plants.

**Best plants to use in Cameroon:**
- Tithonia (Mexican sunflower) — very common
- Moringa leaves
- Comfrey
- Nettles

**Method:**
1. Chop plants and fill a bucket halfway
2. Add water to cover
3. Cover loosely (gases need to escape)
4. Stir every 2 days
5. Ready in 2-3 weeks when dark and smelly
6. Strain and dilute 1:10

## Selling Your Products
- 1 liter of compost tea: 200-500 XAF
- 5 liters of liquid fertilizer: 1,000-2,500 XAF
- Target: market gardeners, nurseries, urban farmers`,
        summary: "Creating and selling liquid fertilizer products from compost",
        practicalTask: "Make a batch of compost tea using available materials. Document your process and results after applying to plants.",
        durationMinutes: 10,
        contentType: "text",
        quizQuestions: [
          {
            question: "What dilution ratio should you use when applying compost tea to plant roots?",
            options: ["Undiluted", "1:2", "1:10", "1:100"],
            correctIndex: 2,
            explanation: "Compost tea should be diluted 1:10 (1 part tea to 10 parts water) for root application.",
          },
        ],
      },
      {
        pathwayId: compostPathway.id,
        orderIndex: 5,
        title: "Starting Your Composting Business",
        content: `# Starting Your Composting Business

You've learned the skill — now let's turn it into income!

## Business Model Options

### Option 1: Sell Finished Compost
- Package in 5kg, 10kg, 25kg bags
- Price: 500-2,000 XAF per 5kg bag
- Target: Home gardeners, urban farmers, nurseries

### Option 2: Composting Service
- Collect organic waste from restaurants, markets, hotels
- Charge a collection fee (monthly subscription)
- Sell the resulting compost
- Double income stream!

### Option 3: Training & Consulting
- Teach others to compost
- Charge for workshops
- Set up systems for schools, hotels, organizations

## Starting Small: Your First 30 Days

**Week 1:** Set up 3-5 compost systems
**Week 2:** Approach 5 potential waste sources (restaurants, markets)
**Week 3:** Create your first batch of packaged compost
**Week 4:** Make your first sales at local markets

## Pricing Guide (Cameroon Market)
| Product | Quantity | Price Range |
|---------|----------|-------------|
| Organic compost | 5kg bag | 500-1,500 XAF |
| Organic compost | 25kg bag | 2,000-5,000 XAF |
| Compost tea | 1 liter | 200-500 XAF |
| Liquid fertilizer | 5 liters | 1,000-2,500 XAF |
| Composting workshop | Per person | 2,000-5,000 XAF |

## Monthly Income Potential
- **Small scale (home-based):** 15,000 - 40,000 XAF/month
- **Medium scale (with collection):** 50,000 - 150,000 XAF/month
- **Commercial scale:** 200,000+ XAF/month

## Marketing Tips
1. Start with neighbors and local WhatsApp groups
2. Offer free samples to first customers
3. Take before/after photos of plants using your compost
4. Partner with local farming groups
5. Brand your product with a simple name and clean packaging`,
        summary: "Turning composting knowledge into a viable green business",
        practicalTask: "Write a simple one-page business plan for a composting business in your area. Include: target customers, pricing, startup costs, and how you'll find your first 5 customers.",
        durationMinutes: 12,
        contentType: "text",
        quizQuestions: [
          {
            question: "What is a 'double income stream' in a composting service business?",
            options: [
              "Working two jobs",
              "Charging for waste collection AND selling the compost produced",
              "Selling online and offline",
              "Getting a loan and making sales",
            ],
            correctIndex: 1,
            explanation: "A composting service can earn money from both the waste collection fee and from selling the finished compost — two revenue streams from one activity.",
          },
        ],
      },
    ])
    .returning();

  console.log(`  ✅ Inserted ${modules.length} learning modules\n`);

  // ==========================================
// LEARNING MODULES: Plastic Recycling Pathway (6 modules)
// ==========================================
console.log("📄 Inserting Plastic Recycling learning modules...");

const plasticPathway = pathways.find(
  (p) => p.title === "Plastic Recycling Business Starter"
)!;

const plasticModules = await db
  .insert(learningModules)
  .values([
    {
      pathwayId: plasticPathway.id,
      orderIndex: 1,
      title: "Understanding Plastic Waste & Recycling Basics",
      content: `# Understanding Plastic Waste & Recycling Basics

## The Plastic Problem in Cameroon
🌍 Every day, tons of plastic waste end up in streets, drains, and oceans. In Cameroon:
- Over 300,000 tons of plastic waste generated annually
- Less than 10% is properly recycled
- Plastic clogs drains → flooding during rainy season
- Burning plastic releases toxic fumes

## Why Recycling Plastic Matters
♻️ **Environmental Impact:**
- Reduces pollution in communities and waterways
- Prevents wildlife harm from plastic ingestion
- Lowers carbon footprint vs. producing new plastic

💰 **Economic Opportunity:**
- Recycled plastic has market value (PET, HDPE, PP)
- Create jobs in collection, sorting, processing
- Build products people need: buckets, tiles, furniture

🔧 **Skill Development:**
- Learn material identification and sorting
- Master basic processing techniques
- Develop entrepreneurship skills

## Types of Plastic: The Resin Codes
Plastics are labeled with numbers 1-7 inside a triangle:

| Code | Type | Common Uses | Recyclable? |
|------|------|-------------|-------------|
| 1 | PET/PETE | Water bottles, soda bottles | ✅ High value |
| 2 | HDPE | Milk jugs, detergent bottles, buckets | ✅ High value |
| 3 | PVC | Pipes, packaging films | ⚠️ Limited |
| 4 | LDPE | Plastic bags, wraps | ⚠️ Specialized |
| 5 | PP | Yogurt containers, bottle caps, straws | ✅ Growing market |
| 6 | PS | Foam cups, packaging peanuts | ❌ Rarely |
| 7 | Other | Mixed plastics, bioplastics | ❌ Usually not |

## The Recycling Value Chain
1. **Collection**: Gather plastic from homes, markets, streets
2. **Sorting**: Separate by type, color, cleanliness
3. **Cleaning**: Wash and dry to remove contaminants
4. **Processing**: Shred, melt, or compress
5. **Manufacturing**: Create new products
6. **Sales**: Sell to consumers or businesses

## Getting Started: Mindset & Safety
✅ Wear gloves and closed shoes when handling waste
✅ Wash hands thoroughly after sorting
✅ Work in well-ventilated areas
✅ Never burn plastic — toxic fumes are dangerous
✅ Start small: focus on 1-2 plastic types first`,
      summary: "Foundation knowledge: plastic types, environmental impact, and the recycling value chain",
      practicalTask: "Collect 10 plastic items from your home. Identify their resin codes (numbers 1-7) and sort them into groups. Take photos of your sorted collection.",
      durationMinutes: 10,
      contentType: "text",
      quizQuestions: [
        {
          question: "What percentage of plastic waste is properly recycled in Cameroon?",
          options: ["Less than 10%", "About 25%", "Around 50%", "Over 75%"],
          correctIndex: 0,
          explanation: "Less than 10% of plastic waste in Cameroon is properly recycled, representing a huge opportunity for improvement.",
        },
        {
          question: "Which resin code represents PET plastic commonly used for water bottles?",
          options: ["1", "2", "5", "7"],
          correctIndex: 0,
          explanation: "Resin code 1 (PET/PETE) is used for water bottles, soda bottles, and has high recycling value.",
        },
        {
          question: "Why should you NEVER burn plastic waste?",
          options: [
            "It wastes potential income",
            "It releases toxic fumes dangerous to health",
            "It makes sorting harder",
            "It attracts pests",
          ],
          correctIndex: 1,
          explanation: "Burning plastic releases toxic chemicals like dioxins that harm human health and the environment.",
        },
        {
          question: "Which plastic type is commonly used for milk jugs and detergent bottles?",
          options: ["PET (1)", "HDPE (2)", "PP (5)", "PVC (3)"],
          correctIndex: 1,
          explanation: "HDPE (High-Density Polyethylene), code 2, is used for sturdy containers like milk jugs and detergent bottles.",
        },
        {
          question: "What is the FIRST step in the plastic recycling value chain?",
          options: ["Processing", "Sorting", "Collection", "Manufacturing"],
          correctIndex: 2,
          explanation: "Collection is the first step: gathering plastic waste from homes, markets, and streets before any processing.",
        },
        {
          question: "Which safety practice is MOST important when handling plastic waste?",
          options: [
            "Wearing expensive equipment",
            "Working alone for efficiency",
            "Wearing gloves and washing hands thoroughly",
            "Sorting only in the rain",
          ],
          correctIndex: 2,
          explanation: "Basic hygiene like wearing gloves and washing hands protects you from contaminants in waste materials.",
        },
        {
          question: "Which resin code plastic has the HIGHEST recycling value in most markets?",
          options: ["Code 3 (PVC)", "Code 6 (PS)", "Code 1 (PET) and Code 2 (HDPE)", "Code 7 (Other)"],
          correctIndex: 2,
          explanation: "PET (1) and HDPE (2) have established markets and high demand from recyclers, making them most valuable.",
        },
        {
          question: "What does 'LDPE' stand for in resin code 4?",
          options: [
            "Low-Density Polyethylene",
            "Long-Duration Plastic Element",
            "Liquid-Derived Polymer Extract",
            "Light-Duty Packaging Envelope",
          ],
          correctIndex: 0,
          explanation: "LDPE stands for Low-Density Polyethylene, used for plastic bags and flexible wraps.",
        },
        {
          question: "Why is sorting plastic by type important?",
          options: [
            "It makes the pile look neater",
            "Different plastics have different melting points and properties",
            "Buyers prefer colorful sorted piles",
            "It's required by law everywhere",
          ],
          correctIndex: 1,
          explanation: "Different plastic types cannot be mixed during recycling because they have different chemical properties and melting temperatures.",
        },
        {
          question: "Which of these is a BENEFIT of plastic recycling for communities?",
          options: [
            "Increased flooding from clogged drains",
            "Creation of local jobs and income opportunities",
            "More plastic waste in streets",
            "Higher costs for waste disposal",
          ],
          correctIndex: 1,
          explanation: "Recycling creates jobs in collection, sorting, processing, and product manufacturing, boosting local economies.",
        },
      ],
    },
    {
      pathwayId: plasticPathway.id,
      orderIndex: 2,
      title: "Identifying & Sorting Plastic Types",
      content: `# Identifying & Sorting Plastic Types

## Mastering Plastic Identification
Accurate sorting is the foundation of profitable recycling. Buyers pay more for clean, well-sorted plastic.

### Visual & Physical Identification Tips

🔍 **PET (Code 1) - Water/Soda Bottles**
- Clear or light blue/green tint
- Makes a "crinkly" sound when crushed
- Base has a 5-point star shape
- Lightweight but rigid

🔍 **HDPE (Code 2) - Opaque Containers**
- Opaque/milky appearance (detergent bottles, buckets)
- Feels waxy or slippery
- Makes a dull "thud" when dropped
- Very durable, doesn't crack easily

🔍 **PP (Code 5) - Bottle Caps, Yogurt Cups**
- Semi-rigid, slightly flexible
- Often has a "hinge" feature (like flip-top caps)
- Floats in water (unlike PET which sinks)
- Resists heat better than other plastics

## Sorting Workflow: Step-by-Step

### Step 1: Pre-Sort by Shape/Use
- Bottles vs. containers vs. films vs. caps
- Remove obvious contaminants (food, metal, paper)

### Step 2: Check for Resin Codes
- Look for the triangle symbol with number
- If no code, use physical properties to guess

### Step 3: Sort by Color (Optional but Valuable)
- Clear/white plastics often fetch higher prices
- Separate dark colors from light colors
- Keep colors consistent for better product quality

### Step 4: Clean & Dry
- Rinse containers to remove residue
- Remove labels when possible (increases value)
- Air-dry completely before storage (prevents mold)

## Common Contaminants to Remove ❌
- Food residue (wash or discard)
- Metal caps/rings (remove and recycle separately)
- Paper labels (peel off when possible)
- Non-plastic items (glass, rubber, fabric)
- Biodegradable "plastic" bags (they contaminate recycling)

## Storage Tips for Sorted Plastic
✅ Use separate sacks or bins for each plastic type
✅ Label containers clearly with code and color
✅ Store in dry, covered area to prevent weather damage
✅ Compress bottles (remove caps first) to save space
✅ Keep a log of quantities collected for business tracking

## Quick Reference: Cameroon Market Values (Approximate)
| Plastic Type | Condition | Price per kg (XAF) |
|--------------|-----------|-------------------|
| PET (clear) | Clean, sorted | 150 - 300 |
| HDPE (mixed colors) | Clean, sorted | 100 - 250 |
| PP (caps, containers) | Clean, sorted | 80 - 200 |
| Mixed/Low-grade | Unsorted, dirty | 20 - 50 |

💡 *Prices vary by location, buyer, and market demand. Always negotiate and build relationships with buyers.*`,
      summary: "Practical techniques for identifying, sorting, and preparing plastics for maximum value",
      practicalTask: "Sort a mixed batch of 20+ plastic items into at least 3 categories (e.g., PET bottles, HDPE containers, PP caps). Photograph your sorted groups and note the resin codes you identified.",
      durationMinutes: 12,
      contentType: "text",
      quizQuestions: [
        {
          question: "Which physical test helps identify PET bottles?",
          options: [
            "It sinks in water",
            "It makes a crinkly sound when crushed",
            "It melts at low heat",
            "It floats and is very flexible",
          ],
          correctIndex: 1,
          explanation: "PET bottles make a distinctive crinkly sound when crushed and often have a 5-point star base pattern.",
        },
        {
          question: "Why is removing food residue from plastic containers important?",
          options: [
            "It makes them heavier to transport",
            "Contaminants reduce value and can spoil entire batches",
            "Buyers prefer dirty plastic for testing",
            "It's not important, buyers wash everything",
          ],
          correctIndex: 1,
          explanation: "Food residue and contaminants lower the quality and value of recycled plastic and can cause processing problems.",
        },
        {
          question: "Which plastic type typically FLOATS in water?",
          options: ["PET (1)", "HDPE (2)", "PP (5)", "PVC (3)"],
          correctIndex: 2,
          explanation: "PP (Polypropylene, code 5) has a density less than water, so it floats — a useful identification trick.",
        },
        {
          question: "What is the BEST way to store sorted plastic before selling?",
          options: [
            "Pile everything together to save space",
            "In separate, labeled, dry containers",
            "Buried underground to keep cool",
            "Left in the sun to bleach colors",
          ],
          correctIndex: 1,
          explanation: "Separate, labeled, dry storage maintains quality, prevents contamination, and makes inventory tracking easier.",
        },
        {
          question: "Which color of PET plastic often fetches the HIGHEST price?",
          options: ["Dark green", "Brown/amber", "Clear/light blue", "Black"],
          correctIndex: 2,
          explanation: "Clear and light-colored PET is more versatile for recyclers, so it typically commands higher prices.",
        },
        {
          question: "What should you do with metal caps/rings on plastic bottles?",
          options: [
            "Leave them on — buyers don't mind",
            "Remove and recycle separately or sell as scrap metal",
            "Melt them into the plastic",
            "Throw them in regular trash",
          ],
          correctIndex: 1,
          explanation: "Metal contaminants can damage recycling equipment. Remove and handle metal separately for proper recycling or scrap value.",
        },
        {
          question: "Approximately what price range can you expect for CLEAN, sorted PET plastic per kg in Cameroon?",
          options: ["20-50 XAF", "80-150 XAF", "150-300 XAF", "500-1000 XAF"],
          correctIndex: 2,
          explanation: "Clean, sorted PET typically sells for 150-300 XAF/kg, though prices vary by location and market conditions.",
        },
        {
          question: "Which item is MOST LIKELY to be PP (Code 5) plastic?",
          options: [
            "Clear water bottle",
            "Opaque detergent jug",
            "Yogurt container or bottle cap",
            "Plastic shopping bag",
          ],
          correctIndex: 2,
          explanation: "PP (polypropylene) is commonly used for yogurt cups, bottle caps, and containers with hinge features.",
        },
        {
          question: "Why compress plastic bottles before storage?",
          options: [
            "To make them harder to identify",
            "To save space and reduce transport costs",
            "To increase their weight for higher pay",
            "To remove the resin code",
          ],
          correctIndex: 1,
          explanation: "Compressing bottles (after removing caps) dramatically reduces volume, saving storage space and transport costs.",
        },
        {
          question: "What is a 'contaminant' in plastic recycling?",
          options: [
            "A valuable plastic type",
            "Any non-plastic or incompatible material mixed with recyclables",
            "A type of cleaning chemical",
            "A brand of sorting equipment",
          ],
          correctIndex: 1,
          explanation: "Contaminants are materials that don't belong in the plastic stream (food, metal, paper, wrong plastic types) and reduce value.",
        },
      ],
    },
    {
      pathwayId: plasticPathway.id,
      orderIndex: 3,
      title: "Collection & Processing Methods",
      content: `# Collection & Processing Methods

## Building Your Collection System

### Option 1: Door-to-Door Collection
- Partner with households in your neighborhood
- Offer weekly pickup for a small fee OR collect free to build supply
- Provide households with labeled bags for plastic only
- Build trust: be reliable, polite, and consistent

### Option 2: Market & Restaurant Partnerships
- Approach food vendors, restaurants, hotels
- Offer to collect their plastic waste regularly
- They save on disposal; you get steady supply
- Formalize with simple agreements (even verbal)

### Option 3: Community Collection Points
- Set up a central drop-off location (your home, a shop)
- Promote via WhatsApp groups, church announcements, local radio
- Offer small incentives: exchange 5kg plastic for soap, airtime, etc.
- Schedule specific collection days

### Option 4: Waste Picker Collaboration
- Partner with informal waste collectors already active
- Offer fair, consistent prices for sorted plastic
- Provide training on sorting to improve quality
- Create a reliable supply chain together

## Basic Processing Techniques

### Step 1: Washing
**Why wash?** Clean plastic = higher value + easier processing

**Simple washing setup:**
- Large basin or drum with water
- Mild detergent or ash (traditional cleaner)
- Brush or cloth for scrubbing
- Rinse with clean water
- Air-dry on racks or clean tarps (sun helps disinfect)

💡 *Tip: Wash in batches by plastic type to avoid cross-contamination*

### Step 2: Shredding (Optional but Valuable)
Shredded plastic sells for more and is easier to transport.

**Low-cost shredding options:**
- Manual hand-crank shredder (build from scrap metal)
- Modified grain mill (adapted for plastic)
- Partner with a local workshop that has a shredder

**Safety first:**
- Wear eye protection and gloves
- Keep hair and loose clothing secured
- Never feed plastic too fast — jamming is dangerous

### Step 3: Densifying (For Transport Efficiency)
Reduce volume for cheaper transport to buyers:

- **Baling**: Use a manual or hydraulic baler to compress into blocks
- **Melting & Molding**: Melt plastic into blocks or pellets (requires heat control)
- **Bagging**: Pack tightly into strong sacks, compress by standing on them

## Quality Control Checklist ✅
Before selling, ensure your plastic is:
- [ ] Sorted by type (PET, HDPE, PP, etc.)
- [ ] Free of food residue and liquids
- [ ] Labels and caps removed (unless buyer wants them)
- [ ] Completely dry (no mold risk)
- [ ] Packed securely for transport

## Tracking Your Business
Keep simple records:
📝 Date, quantity (kg), plastic type, buyer, price/kg, total income
📝 Expenses: transport, washing supplies, bags, equipment repairs
📝 Contacts: suppliers, buyers, partners

Use a notebook, spreadsheet, or free mobile app. Good records = better business decisions!`,
      summary: "Practical collection strategies and basic processing techniques to add value to recycled plastic",
      practicalTask: "Design a simple collection plan for your area: Who will you collect from? How often? What incentives will you offer? Write down 3 potential partners to approach this week.",
      durationMinutes: 11,
      contentType: "text",
      quizQuestions: [
        {
          question: "Which collection method involves setting up a central location for people to drop off plastic?",
          options: [
            "Door-to-door collection",
            "Market partnerships",
            "Community collection points",
            "Waste picker collaboration",
          ],
          correctIndex: 2,
          explanation: "Community collection points are centralized drop-off locations that make it convenient for many people to contribute plastic waste.",
        },
        {
          question: "Why is washing plastic before selling important?",
          options: [
            "It makes the plastic heavier",
            "Clean plastic has higher value and is easier to process",
            "Buyers require plastic to be wet",
            "Washing removes the resin code",
          ],
          correctIndex: 1,
          explanation: "Clean, dry plastic commands higher prices and is preferred by processors because contaminants cause problems during recycling.",
        },
        {
          question: "What is a key SAFETY practice when shredding plastic?",
          options: [
            "Shred as fast as possible to save time",
            "Wear eye protection and keep loose clothing secured",
            "Shred all plastic types together",
            "Use bare hands to feed the machine",
          ],
          correctIndex: 1,
          explanation: "Shredding equipment can be dangerous; eye protection and securing clothing/hair prevents serious injuries.",
        },
        {
          question: "What does 'densifying' plastic mean?",
          options: [
            "Making plastic more colorful",
            "Reducing its volume for easier transport and storage",
            "Adding chemicals to strengthen it",
            "Mixing different plastic types together",
          ],
          correctIndex: 1,
          explanation: "Densifying means compressing plastic (baling, melting into blocks) to reduce volume, lowering transport costs and increasing efficiency.",
        },
        {
          question: "Which item should be REMOVED before selling sorted PET bottles?",
          options: [
            "The plastic bottle itself",
            "Metal caps and paper labels",
            "The resin code symbol",
            "Air from inside the bottle",
          ],
          correctIndex: 1,
          explanation: "Metal caps and paper labels are contaminants for PET recycling streams and should be removed to maximize value.",
        },
        {
          question: "What is a benefit of partnering with informal waste pickers?",
          options: [
            "They do all the work for free",
            "You gain access to their existing collection networks and knowledge",
            "They guarantee fixed prices forever",
            "They handle all customer service",
          ],
          correctIndex: 1,
          explanation: "Waste pickers have valuable local knowledge and established routes; partnering creates a more reliable, scalable supply chain.",
        },
        {
          question: "Why keep business records for your plastic recycling activity?",
          options: [
            "Records are legally required for all informal businesses",
            "Good records help track profits, identify trends, and make better decisions",
            "Buyers require to see your records before purchasing",
            "Records increase the weight of your plastic",
          ],
          correctIndex: 1,
          explanation: "Tracking income, expenses, and quantities helps you understand profitability, plan growth, and negotiate better with buyers.",
        },
        {
          question: "Which household incentive could encourage plastic drop-offs?",
          options: [
            "Charging them for collection",
            "Exchanging 5kg of plastic for soap or airtime credit",
            "Requiring them to sort by color",
            "Only accepting plastic on Sundays",
          ],
          correctIndex: 1,
          explanation: "Small, tangible incentives motivate participation and build community engagement in your collection system.",
        },
        {
          question: "What is the purpose of a 'quality control checklist' before selling?",
          options: [
            "To make the process take longer",
            "To ensure your product meets buyer expectations and fetches better prices",
            "To confuse potential buyers",
            "To avoid having to transport the plastic",
          ],
          correctIndex: 1,
          explanation: "Quality control ensures your sorted plastic is clean, dry, and properly categorized — key factors buyers use to determine price.",
        },
        {
          question: "Which processing step typically adds the MOST value to sorted plastic?",
          options: [
            "Storing it longer",
            "Washing and shredding",
            "Mixing all types together",
            "Leaving labels and caps on",
          ],
          correctIndex: 1,
          explanation: "Washing removes contaminants and shredding reduces volume and prepares plastic for manufacturing — both significantly increase market value.",
        },
      ],
    },
    {
      pathwayId: plasticPathway.id,
      orderIndex: 4,
      title: "Transforming Plastic into Products",
      content: `# Transforming Plastic into Products

## Why Make Products? (Beyond Selling Raw Plastic)
✅ Higher profit margins: A 500 XAF/kg plastic bag can become a 2,000 XAF bucket
✅ Local market demand: Communities need affordable, durable goods
✅ Brand building: Create your own product line and reputation
✅ Waste reduction: Keep plastic in use longer in your community

## Beginner-Friendly Product Ideas (Cameroon Context)

### 🪣 Household Items
- **Buckets & Basins**: Melt HDPE into molds (simple sand molds work)
- **Coat Hangers**: Bend and shape PP strips with heat
- **Storage Containers**: Use injection molding with basic equipment
- **Door Mats**: Weave or fuse plastic strips/bags

### 🧱 Construction Materials
- **Eco-Tiles**: Mix shredded plastic with sand, heat-press into tiles
- **Fence Posts**: Melt mixed plastics into sturdy posts (termite-resistant!)
- **Roofing Sheets**: Flatten and fuse HDPE sheets with heat

### 🎨 Creative Upcycling
- **Fashion Accessories**: Bags, wallets from woven plastic strips
- **Planters & Pots**: Cut and reshape large containers
- **Toys & Games**: Safe, durable items from clean plastic

## Basic Techniques: No Factory Needed

### Technique 1: Heat Molding (For HDPE/PP)
**What you need**: Heat source (charcoal stove, gas burner), metal mold, gloves, ventilation

**Process**:
1. Shred clean HDPE/PP plastic into small pieces
2. Place in mold (e.g., bucket-shaped metal form)
3. Heat gently until plastic melts and fills mold (~160-180°C)
4. Press down firmly with a plunger or weight
5. Let cool completely before removing
6. Trim edges with knife or sandpaper

⚠️ **Safety**: Work outdoors or in VERY well-ventilated area. Never overheat — burning plastic releases toxic fumes.

### Technique 2: Plastic-Sand Composite Tiles
**What you need**: Shredded plastic (mixed types OK), clean sand, metal mold, heat source, press

**Process**:
1. Mix 30% shredded plastic + 70% sand by volume
2. Heat mixture in mold while stirring (plastic melts and coats sand)
3. Press firmly to compact and shape
4. Cool completely before demolding
5. Cure 24 hours before use

✅ **Benefits**: Stronger than concrete, waterproof, termite-proof, uses mixed/low-grade plastic

### Technique 3: Weaving with Plastic Strips
**What you need**: Plastic bags or films, cutter, loom or frame, needle (optional)

**Process**:
1. Cut plastic bags into continuous strips ("plarn" = plastic yarn)
2. Weave strips on simple loom or by hand (like basket weaving)
3. Fuse ends with heat (lighter or iron on low) to prevent unraveling
4. Shape into mats, bags, or decorative items

✅ **Benefits**: No heat required for assembly, great for LDPE films, creative flexibility

## Sourcing Materials Locally
- **Molds**: Repurpose old buckets, pots, or work with local metalworkers
- **Heat sources**: Charcoal stoves, gas burners, or build a simple solar concentrator
- **Tools**: Start with basic items (knife, hammer, gloves) and upgrade as you grow
- **Safety gear**: Prioritize heat-resistant gloves, eye protection, and masks

## Pricing Your Products
| Product | Material Cost (XAF) | Labor/Overhead | Suggested Sale Price |
|---------|---------------------|----------------|---------------------|
| 10L Bucket (HDPE) | 300-500 | 200-400 | 1,500-3,000 |
| Eco-Tile (30x30cm) | 200-400 | 150-300 | 1,000-2,500 |
| Woven Plastic Mat | 100-200 | 300-600 | 1,500-4,000 |
| Plastic Coat Hanger | 50-100 | 50-150 | 500-1,200 |

💡 *Price based on local competition, quality, and customer willingness to pay. Start modestly, then increase as reputation grows.*`,
      summary: "Hands-on methods to transform recycled plastic into valuable, marketable products using low-cost techniques",
      practicalTask: "Choose ONE product idea from this module. Sketch a simple design, list the materials/tools needed, and estimate your startup cost to make 5 units. Share your plan with a friend for feedback.",
      durationMinutes: 13,
      contentType: "text",
      quizQuestions: [
        {
          question: "What is a key ADVANTAGE of making products from recycled plastic vs. selling raw plastic?",
          options: [
            "Products take less time to make",
            "Higher profit margins and local market demand",
            "No need to sort or clean plastic",
            "Products require no marketing",
          ],
          correctIndex: 1,
          explanation: "Transforming plastic into finished products typically yields higher profits and meets direct community needs, creating stronger business opportunities.",
        },
        {
          question: "Which plastic types are BEST for heat molding techniques?",
          options: ["PET (1) and PVC (3)", "HDPE (2) and PP (5)", "LDPE (4) and PS (6)", "All types work equally well"],
          correctIndex: 1,
          explanation: "HDPE and PP have suitable melting points and properties for heat molding; PET requires more precise temperature control and is less beginner-friendly.",
        },
        {
          question: "What is the approximate melting temperature range for HDPE plastic?",
          options: ["80-100°C", "120-140°C", "160-180°C", "220-240°C"],
          correctIndex: 2,
          explanation: "HDPE melts around 160-180°C — hot enough to require caution, but achievable with common heat sources like charcoal stoves.",
        },
        {
          question: "In plastic-sand composite tiles, what is the typical ratio of plastic to sand?",
          options: ["50% plastic / 50% sand", "30% plastic / 70% sand", "70% plastic / 30% sand", "10% plastic / 90% sand"],
          correctIndex: 1,
          explanation: "A 30:70 plastic-to-sand ratio provides strength from the sand while the melted plastic acts as a binder, creating durable, cost-effective tiles.",
        },
        {
          question: "What is 'plarn' in the context of plastic upcycling?",
          options: [
            "A brand of recycling equipment",
            "Plastic yarn made by cutting bags into continuous strips",
            "A chemical additive for melting plastic",
            "A type of mold for shaping plastic",
          ],
          correctIndex: 1,
          explanation: "'Plarn' (plastic + yarn) refers to strips cut from plastic bags that can be woven or crocheted like traditional yarn.",
        },
        {
          question: "Why is ventilation CRITICAL when heat-molding plastic?",
          options: [
            "It helps the plastic cool faster",
            "Burning or overheating plastic releases toxic fumes harmful to breathe",
            "Ventilation makes the plastic more colorful",
            "It's not critical, just recommended",
          ],
          correctIndex: 1,
          explanation: "Overheating plastic can release hazardous chemicals; working in well-ventilated areas or outdoors protects your respiratory health.",
        },
        {
          question: "Which product is BEST suited for using mixed/low-grade plastic types?",
          options: [
            "Clear water bottles",
            "Plastic-sand composite tiles",
            "Food storage containers",
            "Medical equipment",
          ],
          correctIndex: 1,
          explanation: "Eco-tiles can use mixed plastics because the plastic acts as a binder for sand; purity is less critical than for food-grade or clear products.",
        },
        {
          question: "What is a SMART way to source molds for beginner product-making?",
          options: [
            "Import expensive steel molds from abroad",
            "Repurpose old buckets, pots, or collaborate with local metalworkers",
            "Use only 3D-printed molds",
            "Avoid molds entirely and free-hand shape everything",
          ],
          correctIndex: 1,
          explanation: "Starting with repurposed items or local craftsmanship keeps costs low and supports the local economy while you validate your product idea.",
        },
        {
          question: "When pricing your recycled plastic products, what should you consider FIRST?",
          options: [
            "What competitors charge and what customers will pay locally",
            "The highest possible price to maximize profit",
            "Only your material costs, ignoring labor",
            "Prices from international markets",
          ],
          correctIndex: 0,
          explanation: "Local market research ensures your prices are competitive and realistic; start modestly to build demand, then adjust as you gain reputation.",
        },
        {
          question: "Which safety item is MOST important when heat-molding plastic?",
          options: [
            "Fancy apron",
            "Heat-resistant gloves and eye protection",
            "Branded t-shirt",
            "Noise-canceling headphones",
          ],
          correctIndex: 1,
          explanation: "Heat-resistant gloves prevent burns, and eye protection shields against splashes or fumes — non-negotiable for safe plastic processing.",
        },
      ],
    },
    {
      pathwayId: plasticPathway.id,
      orderIndex: 5,
      title: "Quality Control & Safety Practices",
      content: `# Quality Control & Safety Practices

## Why Quality Control Matters
✅ Consistent quality = repeat customers and referrals
✅ Fewer returns/complaints = less wasted time and materials
✅ Higher prices for verified, reliable products
✅ Builds your reputation as a trustworthy green business

## Quality Checks at Every Stage

### 🔍 During Collection & Sorting
- Verify resin codes match the batch
- Reject heavily contaminated items (food, chemicals, non-plastic)
- Separate by color if targeting premium buyers
- Document quantities and sources for traceability

### 🧼 During Washing & Preparation
- Ensure no visible residue remains after washing
- Confirm plastic is 100% dry before storage (prevents mold)
- Check that labels/caps are removed per buyer specifications
- Use clean water and containers to avoid re-contamination

### 🔥 During Processing/Product-Making
- Monitor temperature to avoid burning (smell test: if it smells acrid, it's too hot)
- Ensure even melting and distribution in molds
- Check finished products for cracks, weak spots, or deformities
- Test durability: drop test buckets, bend test hangers

### 📦 Before Sale/Delivery
- Inspect each item for cosmetic defects
- Package securely to prevent damage in transport
- Include simple care/use instructions if helpful
- Add your brand/contact info for feedback

## Safety First: Non-Negotiable Practices

### 👷 Personal Protective Equipment (PPE)
| Hazard | Required PPE |
|--------|--------------|
| Sharp edges, debris | Cut-resistant gloves, closed shoes |
| Dust, particles | Dust mask or respirator |
| Heat, melting plastic | Heat-resistant gloves, long sleeves, eye protection |
| Fumes (during heating) | Work outdoors OR use fan + mask rated for organic vapors |
| Loud noise (shredding) | Earplugs or earmuffs |

### 🏠 Workspace Safety
✅ Keep work area clean and organized to prevent trips/falls
✅ Store flammable materials away from heat sources
✅ Have a fire extinguisher (or sand/water bucket) accessible
✅ Ensure good lighting to see details and avoid mistakes
✅ Post emergency contacts and first aid kit visibly

### ♻️ Chemical & Waste Safety
- Never mix unknown chemicals with plastic during processing
- Dispose of wastewater responsibly (avoid contaminating soil/water)
- Store sorted plastic away from food preparation areas
- Label all containers clearly (contents, date, hazards if any)

### 🤝 Community & Customer Safety
- Ensure products are safe for intended use (e.g., no sharp edges on buckets)
- Avoid using plastics that previously held hazardous chemicals
- Be transparent about materials and processes if customers ask
- Provide basic usage guidelines to prevent misuse

## Simple Quality Documentation
You don't need complex software. Track with a notebook:

📋 **Production Log Template**


## Handling Defects & Returns
🔄 **Minor defects** (cosmetic): Offer small discount or include as "bonus" item
🔄 **Functional defects**: Replace or refund promptly — protects reputation
🔄 **Recurring issues**: Investigate root cause (material? process? training?) and fix systemically

💡 *Turning a complaint into a positive experience can create a loyal customer.*`,
      summary: "Essential quality control checkpoints and safety protocols to protect people, products, and your business reputation",
      practicalTask: "Create a simple 1-page Quality & Safety Checklist for your chosen product. Include 5 quality checks and 3 safety rules. Post it in your workspace and use it for your next production batch.",
      durationMinutes: 10,
      contentType: "text",
      quizQuestions: [
        {
          question: "Why is ensuring plastic is 100% dry before storage important?",
          options: [
            "Wet plastic weighs more and costs more to transport",
            "Moisture can cause mold, odors, and degrade plastic quality",
            "Buyers prefer wet plastic for testing",
            "Dry plastic is more colorful",
          ],
          correctIndex: 1,
          explanation: "Moisture promotes mold growth and can cause plastics to degrade or develop unpleasant odors, reducing market value.",
        },
        {
          question: "Which PPE is MOST critical when melting plastic?",
          options: [
            "Fancy apron",
            "Heat-resistant gloves and eye protection",
            "Rubber boots",
            "Sun hat",
          ],
          correctIndex: 1,
          explanation: "Heat-resistant gloves prevent burns from hot molds/plastic, and eye protection shields against splashes or fumes — essential for safe thermal processing.",
        },
        {
          question: "What should you do if melted plastic starts smelling acrid or burning?",
          options: [
            "Add more plastic to dilute the smell",
            "Immediately reduce heat and improve ventilation — it's overheating",
            "Ignore it, all plastic smells when melted",
            "Pour water on it to cool quickly",
          ],
          correctIndex: 1,
          explanation: "An acrid smell indicates overheating, which can release toxic fumes. Reduce heat immediately and ensure strong ventilation.",
        },
        {
          question: "Why keep a simple production log?",
          options: [
            "Logs are legally required for all businesses",
            "Tracking helps identify patterns, improve quality, and solve recurring issues",
            "Buyers require to see your logs before purchasing",
            "Logs increase the weight of your products",
          ],
          correctIndex: 1,
          explanation: "Documentation helps you learn from each batch, maintain consistency, and make data-driven improvements to your process.",
        },
        {
          question: "What is a SMART way to handle a customer complaint about a defective product?",
          options: [
            "Argue that the customer misused it",
            "Replace or refund promptly, then investigate the cause to prevent recurrence",
            "Ignore small complaints to save time",
            "Blame your suppliers publicly",
          ],
          correctIndex: 1,
          explanation: "Prompt resolution builds trust; investigating root causes turns problems into opportunities for system improvement.",
        },
        {
          question: "Which workspace practice reduces accident risk?",
          options: [
            "Piling materials in walkways to save space",
            "Keeping the area clean, organized, and well-lit",
            "Working alone to avoid distractions",
            "Using the cheapest tools available",
          ],
          correctIndex: 1,
          explanation: "A tidy, well-lit workspace prevents trips, falls, and mistakes — foundational to safe, efficient operations.",
        },
        {
          question: "Why avoid using plastics that previously held hazardous chemicals?",
          options: [
            "They are harder to clean",
            "Residual chemicals could contaminate new products or harm users",
            "They have no resin code",
            "They are always black-colored",
          ],
          correctIndex: 1,
          explanation: "Chemical residues can leach into new products or expose users to toxins; source plastics from safe, known origins when possible.",
        },
        {
          question: "What is the purpose of a 'drop test' for finished buckets?",
          options: [
            "To see how loud they are",
            "To verify durability and identify weak points before sale",
            "To remove excess plastic",
            "To clean the surface",
          ],
          correctIndex: 1,
          explanation: "Simple stress tests like dropping help ensure products meet durability expectations and catch flaws before they reach customers.",
        },
        {
          question: "Which fire safety measure is MOST practical for a small plastic workshop?",
          options: [
            "Install a commercial sprinkler system",
            "Keep a bucket of sand or water and a basic fire extinguisher accessible",
            "Work only at night to avoid heat",
            "Ban all heat sources entirely",
          ],
          correctIndex: 1,
          explanation: "Simple, accessible fire suppression (sand, water, extinguisher) is realistic for small operations and can prevent small incidents from becoming disasters.",
        },
        {
          question: "How can quality control directly impact your pricing?",
          options: [
            "Higher quality allows you to charge premium prices and build reputation",
            "Quality checks increase costs so you must lower prices",
            "Customers don't notice quality differences",
            "Quality only matters for export products",
          ],
          correctIndex: 0,
          explanation: "Consistent, reliable quality justifies higher prices, reduces returns, and builds customer loyalty — all contributing to better profitability.",
        },
      ],
    },
    {
      pathwayId: plasticPathway.id,
      orderIndex: 6,
      title: "Launching Your Recycling Business",
      content: `# Launching Your Recycling Business

## From Skill to Income: Your Launch Roadmap

### Phase 1: Validate (Weeks 1-2)
✅ Test your collection method with 5-10 households or 1-2 small businesses
✅ Produce a small batch of your chosen product (e.g., 10 buckets)
✅ Get feedback from friends, family, or early customers
✅ Calculate real costs: materials, time, transport, tools

### Phase 2: Formalize (Weeks 3-4)
✅ Choose a simple business name and logo (even hand-drawn!)
✅ Set clear prices based on costs + market research
✅ Open a dedicated mobile money account for business transactions
✅ Create basic branding: label products with name/contact (sticker, stamp, or tag)

### Phase 3: Sell & Scale (Weeks 5-8)
✅ Start with low-risk channels: WhatsApp status, local market stall, church announcements
✅ Offer "launch discount" or "buy 2, get 1 small item free" to attract first customers
✅ Ask happy customers for referrals or testimonials (voice note, photo, short quote)
✅ Reinvest early profits into better tools, more materials, or marketing

## Pricing Strategy That Works
💡 **Cost-Plus Pricing Formula**:


## Handling Defects & Returns
🔄 **Minor defects** (cosmetic): Offer small discount or include as "bonus" item
🔄 **Functional defects**: Replace or refund promptly — protects reputation
🔄 **Recurring issues**: Investigate root cause (material? process? training?) and fix systemically

💡 *Turning a complaint into a positive experience can create a loyal customer.*`,
      summary: "Essential quality control checkpoints and safety protocols to protect people, products, and your business reputation",
      practicalTask: "Create a simple 1-page Quality & Safety Checklist for your chosen product. Include 5 quality checks and 3 safety rules. Post it in your workspace and use it for your next production batch.",
      durationMinutes: 10,
      contentType: "text",
      quizQuestions: [
        {
          question: "Why is ensuring plastic is 100% dry before storage important?",
          options: [
            "Wet plastic weighs more and costs more to transport",
            "Moisture can cause mold, odors, and degrade plastic quality",
            "Buyers prefer wet plastic for testing",
            "Dry plastic is more colorful",
          ],
          correctIndex: 1,
          explanation: "Moisture promotes mold growth and can cause plastics to degrade or develop unpleasant odors, reducing market value.",
        },
        {
          question: "Which PPE is MOST critical when melting plastic?",
          options: [
            "Fancy apron",
            "Heat-resistant gloves and eye protection",
            "Rubber boots",
            "Sun hat",
          ],
          correctIndex: 1,
          explanation: "Heat-resistant gloves prevent burns from hot molds/plastic, and eye protection shields against splashes or fumes — essential for safe thermal processing.",
        },
        {
          question: "What should you do if melted plastic starts smelling acrid or burning?",
          options: [
            "Add more plastic to dilute the smell",
            "Immediately reduce heat and improve ventilation — it's overheating",
            "Ignore it, all plastic smells when melted",
            "Pour water on it to cool quickly",
          ],
          correctIndex: 1,
          explanation: "An acrid smell indicates overheating, which can release toxic fumes. Reduce heat immediately and ensure strong ventilation.",
        },
        {
          question: "Why keep a simple production log?",
          options: [
            "Logs are legally required for all businesses",
            "Tracking helps identify patterns, improve quality, and solve recurring issues",
            "Buyers require to see your logs before purchasing",
            "Logs increase the weight of your products",
          ],
          correctIndex: 1,
          explanation: "Documentation helps you learn from each batch, maintain consistency, and make data-driven improvements to your process.",
        },
        {
          question: "What is a SMART way to handle a customer complaint about a defective product?",
          options: [
            "Argue that the customer misused it",
            "Replace or refund promptly, then investigate the cause to prevent recurrence",
            "Ignore small complaints to save time",
            "Blame your suppliers publicly",
          ],
          correctIndex: 1,
          explanation: "Prompt resolution builds trust; investigating root causes turns problems into opportunities for system improvement.",
        },
        {
          question: "Which workspace practice reduces accident risk?",
          options: [
            "Piling materials in walkways to save space",
            "Keeping the area clean, organized, and well-lit",
            "Working alone to avoid distractions",
            "Using the cheapest tools available",
          ],
          correctIndex: 1,
          explanation: "A tidy, well-lit workspace prevents trips, falls, and mistakes — foundational to safe, efficient operations.",
        },
        {
          question: "Why avoid using plastics that previously held hazardous chemicals?",
          options: [
            "They are harder to clean",
            "Residual chemicals could contaminate new products or harm users",
            "They have no resin code",
            "They are always black-colored",
          ],
          correctIndex: 1,
          explanation: "Chemical residues can leach into new products or expose users to toxins; source plastics from safe, known origins when possible.",
        },
        {
          question: "What is the purpose of a 'drop test' for finished buckets?",
          options: [
            "To see how loud they are",
            "To verify durability and identify weak points before sale",
            "To remove excess plastic",
            "To clean the surface",
          ],
          correctIndex: 1,
          explanation: "Simple stress tests like dropping help ensure products meet durability expectations and catch flaws before they reach customers.",
        },
        {
          question: "Which fire safety measure is MOST practical for a small plastic workshop?",
          options: [
            "Install a commercial sprinkler system",
            "Keep a bucket of sand or water and a basic fire extinguisher accessible",
            "Work only at night to avoid heat",
            "Ban all heat sources entirely",
          ],
          correctIndex: 1,
          explanation: "Simple, accessible fire suppression (sand, water, extinguisher) is realistic for small operations and can prevent small incidents from becoming disasters.",
        },
        {
          question: "How can quality control directly impact your pricing?",
          options: [
            "Higher quality allows you to charge premium prices and build reputation",
            "Quality checks increase costs so you must lower prices",
            "Customers don't notice quality differences",
            "Quality only matters for export products",
          ],
          correctIndex: 0,
          explanation: "Consistent, reliable quality justifies higher prices, reduces returns, and builds customer loyalty — all contributing to better profitability.",
        },
      ],
    },
    {
      pathwayId: plasticPathway.id,
      orderIndex: 6,
      title: "Launching Your Recycling Business",
      content: `# Launching Your Recycling Business

## From Skill to Income: Your Launch Roadmap

### Phase 1: Validate (Weeks 1-2)
✅ Test your collection method with 5-10 households or 1-2 small businesses
✅ Produce a small batch of your chosen product (e.g., 10 buckets)
✅ Get feedback from friends, family, or early customers
✅ Calculate real costs: materials, time, transport, tools

### Phase 2: Formalize (Weeks 3-4)
✅ Choose a simple business name and logo (even hand-drawn!)
✅ Set clear prices based on costs + market research
✅ Open a dedicated mobile money account for business transactions
✅ Create basic branding: label products with name/contact (sticker, stamp, or tag)

### Phase 3: Sell & Scale (Weeks 5-8)
✅ Start with low-risk channels: WhatsApp status, local market stall, church announcements
✅ Offer "launch discount" or "buy 2, get 1 small item free" to attract first customers
✅ Ask happy customers for referrals or testimonials (voice note, photo, short quote)
✅ Reinvest early profits into better tools, more materials, or marketing

## Pricing Strategy That Works
💡 **Cost-Plus Pricing Formula**:


📊 **Example: 10L HDPE Bucket**
- Plastic material: 400 XAF
- Labor (your time): 300 XAF
- Fuel/overhead: 100 XAF
- **Total Cost**: 800 XAF
- **Selling Price** (2x markup): 1,600 XAF
- **Profit per unit**: 800 XAF

✅ *Adjust markup based on competition, perceived value, and customer willingness to pay.*

## Marketing on a Budget (Cameroon Context)

### 📱 Digital & Social
- WhatsApp Status: Post product photos, prices, contact info daily
- Facebook Groups: Join local buy/sell/community groups; post with clear photos
- TikTok/Reels: Short videos showing your process ("From waste to bucket in 60 seconds!")

### 🗣️ Community-Based
- Partner with local shops: Display/sell your products on consignment
- Demonstrate at markets: Show durability tests live (drop a bucket!)
- Leverage community events: Churches, schools, neighborhood meetings

### 🤝 Trust-Building Tactics
- Offer a simple guarantee: "If it breaks in 30 days, we replace it"
- Share your story: "I turn plastic waste into useful products — help clean our community!"
- Show impact: "Every bucket sold = 2kg plastic kept out of drains"

## Legal & Administrative Basics
⚠️ *Consult local authorities for exact requirements, but generally:*

✅ Register as a micro-entrepreneur if scaling beyond informal (low-cost in many regions)
✅ Keep simple financial records for taxes and planning
✅ Understand basic consumer protection: honest labeling, safe products
✅ If employing others: clarify roles, fair pay, and safety expectations

## Scaling Thoughtfully
🌱 **Grow your impact, not just your size**:
- Train 1-2 helpers using your documented processes
- Expand product line based on customer requests (not just your ideas)
- Explore B2B: supply eco-tiles to construction projects, buckets to farms
- Seek partnerships: NGOs, local government waste programs, schools

## Measuring Success Beyond Money
🌍 **Environmental Impact**: Track kg of plastic diverted from waste streams
👥 **Social Impact**: Jobs created, skills shared, community cleanliness improved
💡 **Innovation**: New products developed, processes improved, problems solved

📈 **Simple Impact Tracker**:


## Your Launch Checklist ✅
- [ ] Validated product with real users
- [ ] Clear pricing and cost structure
- [ ] Basic branding (name, contact, simple logo)
- [ ] First 10 customers identified
- [ ] Safety and quality protocols documented
- [ ] Mobile money/payment method ready
- [ ] Launch promotion plan (WhatsApp post, market demo, etc.)

🚀 *You're not just starting a business — you're building a circular economy solution for your community.*`,
      summary: "Practical steps to launch, market, and grow a sustainable plastic recycling micro-business in Cameroon",
      practicalTask: "Draft your 30-day launch plan: List your first product, target customers, pricing, and 3 marketing actions you'll take in Week 1. Share it with a mentor or peer for feedback.",
      durationMinutes: 12,
      contentType: "text",
      quizQuestions: [
        {
          question: "What is the FIRST phase in the business launch roadmap?",
          options: ["Scale production", "Formalize branding", "Validate with small tests", "Hire employees"],
          correctIndex: 2,
          explanation: "Validation (testing collection, producing small batches, getting feedback) reduces risk before investing significant time or money.",
        },
        {
          question: "In the cost-plus pricing example, what was the selling price for a bucket with 800 XAF total cost and 2x markup?",
          options: ["800 XAF", "1,200 XAF", "1,600 XAF", "2,400 XAF"],
          correctIndex: 2,
          explanation: "Total cost (800 XAF) × 2 = 1,600 XAF selling price, yielding 800 XAF profit per unit.",
        },
        {
          question: "Which low-budget marketing tactic is HIGHLY effective in Cameroon?",
          options: [
            "Billboard advertising in major cities",
            "WhatsApp Status posts with clear photos and contact info",
            "National TV commercials",
            "Printing 10,000 flyers",
          ],
          correctIndex: 1,
          explanation: "WhatsApp is widely used across Cameroon; Status updates reach your network instantly at zero cost and drive local engagement.",
        },
        {
          question: "Why offer a simple product guarantee (e.g., 'replace if breaks in 30 days')?",
          options: [
            "It increases your costs with no benefit",
            "It builds customer trust and reduces purchase hesitation",
            "Customers never use guarantees anyway",
            "It's legally required for all products",
          ],
          correctIndex: 1,
          explanation: "A clear guarantee signals confidence in your product quality and reduces perceived risk for first-time buyers.",
        },
        {
          question: "What does 'B2B' mean in the scaling section?",
          options: [
            "Back-to-Basic production",
            "Business-to-Business sales (selling to other companies)",
            "Buy-2-Get-1 promotions",
            "Brand-to-Buyer direct shipping",
          ],
          correctIndex: 1,
          explanation: "B2B (Business-to-Business) means selling your products to other businesses (e.g., construction firms, farms) rather than only end consumers.",
        },
        {
          question: "Which metric tracks ENVIRONMENTAL impact of your recycling business?",
          options: [
            "Number of employees hired",
            "Kilograms of plastic diverted from waste streams",
            "Social media followers gained",
            "Number of product colors offered",
          ],
          correctIndex: 1,
          explanation: "Tracking kg of plastic collected and recycled directly measures your contribution to waste reduction and environmental health.",
        },
        {
          question: "Why open a dedicated mobile money account for your business?",
          options: [
            "To qualify for bank loans immediately",
            "To separate business and personal finances for clarity and professionalism",
            "Because personal accounts can't receive payments",
            "To avoid paying any taxes",
          ],
          correctIndex: 1,
          explanation: "Separate accounts simplify tracking income/expenses, build credibility with customers, and make financial planning easier.",
        },
        {
          question: "What is a SMART way to choose your first product to sell?",
          options: [
            "Pick the most complex product to impress people",
            "Start with a simple, high-demand item you can produce reliably",
            "Copy exactly what the biggest competitor sells",
            "Wait until you have factory equipment",
          ],
          correctIndex: 1,
          explanation: "Starting simple reduces risk, lets you learn quickly, and builds confidence and cash flow before expanding your product line.",
        },
        {
          question: "Which item is NOT typically needed in your launch checklist?",
          options: [
            "Validated product with real users",
            "Clear pricing and cost structure",
            "A 5-year detailed business plan",
            "Basic branding (name, contact)",
          ],
          correctIndex: 2,
          explanation: "While planning is good, a rigid 5-year plan is less critical at launch than validating demand, pricing, and having a simple way to reach customers.",
        },
        {
          question: "What is the ultimate goal emphasized in the conclusion?",
          options: [
            "Becoming the largest recycler in the country",
            "Building a circular economy solution for your community",
            "Exporting plastic products internationally",
            "Automating all production processes",
          ],
          correctIndex: 1,
          explanation: "The pathway emphasizes community impact, sustainability, and circular economy principles — creating value while solving local waste challenges.",
        },
      ],
    },
  ])
  .returning();

console.log(`  ✅ Inserted ${plasticModules.length} Plastic Recycling modules\n`);


// ==========================================
// LEARNING MODULES: Cookstove Production Pathway (4 modules)
// ==========================================
console.log("📄 Inserting Cookstove learning modules...");

const cookstovePathway = pathways.find(
  (p) => p.title === "Build & Sell Improved Cookstoves"
)!;

const cookstoveModules = await db
  .insert(learningModules)
  .values([
    {
      pathwayId: cookstovePathway.id,
      orderIndex: 1,
      title: "Introduction to Energy-Efficient Cookstoves",
      content: `# Introduction to Energy-Efficient Cookstoves

## The Cooking Challenge in Cameroon
🔥 Traditional 3-stone fires are common but inefficient:
- Use 3-5x more firewood than needed
- Produce heavy smoke → respiratory illnesses (especially for women & children)
- Contribute to deforestation and climate change
- Require constant attention and frequent fueling

## What Makes a Cookstove "Improved"?
✅ **Higher Efficiency**: Converts more fuel energy into cooking heat (less waste)
✅ **Reduced Smoke**: Better combustion = cleaner air indoors
✅ **Faster Cooking**: Concentrated heat boils water quicker
✅ **Safer Design**: Stable base, controlled flame, cooler exterior
✅ **Fuel Flexibility**: Works with wood, charcoal, agricultural residues

## Types of Improved Cookstoves (Cameroon Context)

### 🪵 Rocket Stove (Best for Beginners)
- Simple design using local materials (clay, metal, bricks)
- Insulated combustion chamber for complete burning
- L-shaped fuel feed for easy loading
- Efficiency: 30-40% vs. 10-15% for 3-stone fire

### 🔥 Ceramic/Lined Stoves
- Clay or ceramic liner retains heat
- Good for simmering and traditional dishes
- Longer lifespan with proper care

### ♻️ Metal Fabricated Stoves
- Made from repurposed oil drums, sheet metal
- Portable, durable, faster to produce at scale
- May require welding skills or local artisan partnership

### 🌾 Biomass Pellet Stoves (Advanced)
- Use compressed agricultural waste pellets
- Very clean burn, precise heat control
- Requires pellet production system (future scaling opportunity)

## Why This Skill Matters for You
💰 **Income Opportunity**:
- Sell stoves to households, schools, restaurants
- Offer installation, training, or maintenance services
- Partner with NGOs or government clean energy programs

🌍 **Environmental Impact**:
- Reduce firewood consumption by 40-60%
- Lower smoke emissions → better air quality
- Help preserve forests and biodiversity

❤️ **Health & Social Benefits**:
- Less smoke = fewer respiratory infections
- Save time spent gathering fuel (especially for women/girls)
- Safer cooking environment for families

## Key Principles of Efficient Combustion
🔥 **The Fire Triangle**: Heat + Fuel + Oxygen = Fire  
🎯 **Improved stoves optimize all three**:

1. **Insulation**: Keep heat in the combustion zone (clay, ash, ceramic fiber)
2. **Airflow Control**: Primary air (under fire) + secondary air (above flames) for complete burning
3. **Chimney Effect**: Tall, narrow chimney draws air through fuel for efficient combustion
4. **Pot Support**: Close fit between pot and stove minimizes heat loss

## Safety First: Before You Build
⚠️ **Critical Reminders**:
- Always work in well-ventilated areas when testing stoves
- Keep water or sand nearby when lighting test fires
- Wear heat-resistant gloves and eye protection during testing
- Never leave a burning stove unattended
- Educate users on safe operation (especially children)

## Your Learning Journey Ahead
📚 This pathway will teach you to:
1. Understand stove science and design principles
2. Source local, affordable materials
3. Build a functional rocket stove step-by-step
4. Test, improve, and confidently sell your product

🚀 *You're not just building a stove — you're building healthier homes, cleaner air, and sustainable livelihoods.*`,
      summary: "Foundational knowledge: why improved cookstoves matter, types available, and core efficiency principles",
      practicalTask: "Observe a traditional 3-stone fire in use (safely, from a distance). Note: How much wood is used? How much smoke is produced? How long to boil water? Write down 3 improvements you think a better stove could make.",
      durationMinutes: 9,
      contentType: "text",
      quizQuestions: [
        {
          question: "Compared to a 3-stone fire, how much more efficient can a rocket stove be?",
          options: [
            "About the same (10-15%)",
            "2x more efficient (20-30%)",
            "3-4x more efficient (30-40%)",
            "10x more efficient (90%+)",
          ],
          correctIndex: 2,
          explanation: "Rocket stoves typically achieve 30-40% efficiency by optimizing combustion, versus 10-15% for traditional 3-stone fires.",
        },
        {
          question: "Which of these is NOT a benefit of improved cookstoves?",
          options: [
            "Reduced firewood consumption",
            "Less indoor smoke and respiratory risk",
            "Faster cooking times",
            "Increased production of charcoal",
          ],
          correctIndex: 3,
          explanation: "Improved stoves REDUCE the need for charcoal/firewood by burning fuel more efficiently; they don't increase charcoal production.",
        },
        {
          question: "What are the THREE elements of the 'Fire Triangle'?",
          options: [
            "Wood, water, wind",
            "Heat, fuel, oxygen",
            "Clay, metal, insulation",
            "Smoke, ash, flame",
          ],
          correctIndex: 1,
          explanation: "The fire triangle describes the three requirements for combustion: heat (to ignite), fuel (to burn), and oxygen (to sustain the reaction).",
        },
        {
          question: "Why is insulation important in a rocket stove?",
          options: [
            "It makes the stove heavier and more stable",
            "It keeps heat concentrated in the combustion zone for more complete burning",
            "It changes the color of the flame",
            "It allows the stove to be used indoors without ventilation",
          ],
          correctIndex: 1,
          explanation: "Insulation (clay, ash, ceramic) retains heat where combustion happens, raising temperatures for cleaner, more efficient burning.",
        },
        {
          question: "Which stove type is RECOMMENDED for beginners in this pathway?",
          options: [
            "Biomass pellet stove",
            "Ceramic-lined stove",
            "Rocket stove",
            "Electric induction stove",
          ],
          correctIndex: 2,
          explanation: "Rocket stoves use simple, locally available materials and straightforward construction, making them ideal for first-time builders.",
        },
        {
          question: "What is a key HEALTH benefit of reduced smoke from improved stoves?",
          options: [
            "Food tastes better",
            "Lower risk of respiratory infections, especially for women and children",
            "Pots stay cleaner",
            "Cooking requires less attention",
          ],
          correctIndex: 1,
          explanation: "Smoke from traditional fires contains harmful particulates; reducing exposure significantly lowers risks of pneumonia, COPD, and eye infections.",
        },
        {
          question: "Why is the 'chimney effect' important in stove design?",
          options: [
            "It makes the stove look taller and more professional",
            "It draws air through the fuel, improving combustion efficiency",
            "It allows smoke to escape without a lid",
            "It reduces the amount of fuel needed by 90%",
          ],
          correctIndex: 1,
          explanation: "A properly designed chimney creates upward airflow that pulls oxygen through the fuel bed, promoting complete combustion and reducing smoke.",
        },
        {
          question: "Which safety practice is MOST critical when testing a new stove?",
          options: [
            "Testing at night for dramatic effect",
            "Having water or sand nearby and wearing heat-resistant gloves",
            "Using the most expensive fuel available",
            "Testing alone to avoid distractions",
          ],
          correctIndex: 1,
          explanation: "Fire safety basics — having suppression materials ready and wearing protective gear — prevent accidents during stove testing and refinement.",
        },
        {
          question: "What does 'fuel flexibility' mean for an improved cookstove?",
          options: [
            "The stove can change color based on fuel type",
            "The stove can efficiently burn multiple fuel types (wood, charcoal, crop residues)",
            "The stove automatically adjusts fuel feed rate",
            "The stove works without any fuel",
          ],
          correctIndex: 1,
          explanation: "Fuel flexibility allows users to utilize locally available, affordable fuels, increasing accessibility and resilience of the stove solution.",
        },
        {
          question: "Beyond income, what broader impact can cookstove entrepreneurs create?",
          options: [
            "Only personal profit",
            "Healthier families, preserved forests, and empowered communities",
            "Increased dependence on imported fuels",
            "More time spent gathering firewood",
          ],
          correctIndex: 1,
          explanation: "Clean cookstove adoption delivers triple benefits: health (less smoke), environment (less deforestation), and social (time savings, especially for women).",
        },
      ],
    },
    {
      pathwayId: cookstovePathway.id,
      orderIndex: 2,
      title: "Materials & Design Principles",
      content: `# Materials & Design Principles

## Sourcing Local, Affordable Materials
✅ Build with what's available in your community to keep costs low and repairs easy.

### 🧱 Core Structural Materials
| Material | Use | Local Source Tips |
|----------|-----|------------------|
| **Clay/Soil** | Combustion chamber liner, insulation | Dig from termite mounds (naturally heat-resistant) or riverbanks |
| **Sand** | Insulation mix, molding aid | River sand or construction sites (sift to remove large particles) |
| **Rice Husks / Sawdust** | Lightweight insulation additive | Partner with rice mills, carpentry workshops |
| **Bricks / Stones** | Base, support structure | Local kilns, construction sites, or reclaimed from old buildings |
| **Metal Drum / Sheet** | Outer casing, chimney, pot rest | Repurpose oil drums, water tanks, or work with local metalworkers |

### 🔧 Tools You'll Need (Basic Set)
- Shovel and trowel (for mixing clay/sand)
- Bucket and water source (for mixing)
- Measuring tape or string (for consistent dimensions)
- Hammer and nails (for wooden forms or supports)
- Gloves and eye protection (safety first!)
- Optional: Level, square, or simple jig for repeatability

💡 *Start with hand tools; upgrade as your business grows.*

## Rocket Stove Design: Key Dimensions
📐 **Standard Small Household Rocket Stove** (fits 20-30cm pot):


🎯 **Golden Rule**: Keep the cross-sectional area consistent from fuel feed → combustion chamber → chimney. This maintains proper airflow velocity.

## Insulation Mix Recipes (Tested in Cameroon)

### 🥣 Recipe 1: Clay-Sand-Husk (Best Balance)
- 2 parts clay (sifted)
- 1 part sand
- 1 part dry rice husks or sawdust
- Water: Add slowly until mix holds shape but isn't soggy

✅ *Benefits*: Lightweight, good insulation, cracks less during drying

### 🥣 Recipe 2: Clay-Sand (Simpler, Heavier)
- 3 parts clay
- 1 part sand
- Water to consistency of thick peanut butter

✅ *Benefits*: Very durable, uses only 2 materials; ideal if husks unavailable

### 🌾 Pro Tips for Mixing & Molding
1. **Sift clay** to remove rocks and roots — smoother mix = fewer cracks
2. **Pre-soak dry materials** (husks, sawdust) so they don't absorb water from clay later
3. **Mix thoroughly** — inconsistent mix leads to weak spots
4. **Test a small brick first**: Dry 24h, then fire gently; check for cracking
5. **Use a mold or form** for consistent chamber dimensions (wooden box works)

## Airflow Design: The Secret to Clean Burning
🌬️ **Two-Stage Air Supply** (Key for low smoke):

1. **Primary Air**: Enters under the fuel feed, supports initial ignition
   - Add adjustable vent (sliding metal plate or clay damper) at base of fuel tube

2. **Secondary Air**: Enters above the flame, burns off smoke particles
   - Drill 4-6 small holes (1cm diameter) around the top of the combustion chamber
   - Or leave a small gap between pot rest and chimney wall

🎯 **Test airflow**: Light a small fire; smoke should be minimal after initial ignition. Blue flames at the top indicate good secondary combustion.

## Pot Support & Heat Transfer
🍲 **Optimize the pot-stove interface**:

- **Gap size**: 1-2 cm between pot bottom and flame tip maximizes heat transfer
- **Pot rest design**: 3-4 lugs (clay or metal) that center the pot and allow airflow underneath
- **Skirt (optional)**: A metal or clay ring around the pot sides traps rising heat, boosting efficiency by 10-15%

✅ *Test with your most common pot size* — stoves perform best when matched to user's actual cookware.

## Durability & Maintenance Considerations
🔧 **Design for real-world use**:

- **Thermal shock resistance**: Avoid sudden temperature changes during curing (start with small fires)
- **Easy ash removal**: Include a small access door or removable base section
- **Replaceable parts**: Make the pot rest or chimney liner easy to swap if worn
- **Weather protection**: If used outdoors, add a simple roof or store under cover

💡 *A stove that lasts 2-3 years with basic care offers far better value than a fragile "cheap" model.*`,
      summary: "Practical guidance on sourcing materials, key rocket stove dimensions, insulation recipes, and airflow design for clean combustion",
      practicalTask: "Visit a local market or construction site. Identify and price 3 potential materials for your stove (e.g., clay source, sand, metal drum). Sketch a simple stove design with approximate dimensions based on your most common pot size.",
      durationMinutes: 11,
      contentType: "text",
      quizQuestions: [
        {
          question: "Why are termite mounds a good source of clay for stoves?",
          options: [
            "They are easy to dig with bare hands",
            "Termite-built clay is naturally heat-resistant and well-compacted",
            "They contain built-in insulation fibers",
            "They are always located near water sources",
          ],
          correctIndex: 1,
          explanation: "Termites process clay with saliva and organic materials, creating a dense, heat-resistant structure ideal for high-temperature applications like stove liners.",
        },
        {
          question: "What is the 'Golden Rule' for rocket stove airflow design?",
          options: [
            "Make the chimney as tall as possible",
            "Keep cross-sectional area consistent from fuel feed to chimney",
            "Use only metal parts for durability",
            "Seal all joints completely with clay",
          ],
          correctIndex: 1,
          explanation: "Consistent cross-sectional area maintains proper air velocity for efficient combustion; abrupt changes disrupt airflow and cause smoke.",
        },
        {
          question: "In the Clay-Sand-Husk insulation recipe, what is the role of rice husks?",
          options: [
            "They provide fuel for the stove",
            "They create air pockets that improve insulation and reduce weight",
            "They make the clay harder when fired",
            "They change the color of the stove",
          ],
          correctIndex: 1,
          explanation: "Organic materials like husks burn out during first firing, leaving tiny air pockets that enhance insulation and reduce thermal mass (faster heating).",
        },
        {
          question: "What is the purpose of 'secondary air' holes in a rocket stove?",
          options: [
            "To let smoke escape faster",
            "To introduce oxygen above the flame to burn off smoke particles",
            "To cool down the stove exterior",
            "To allow ash to fall out",
          ],
          correctIndex: 1,
          explanation: "Secondary air enables complete combustion of volatile gases and smoke particles, significantly reducing emissions and improving efficiency.",
        },
        {
          question: "What is the ideal gap between the pot bottom and flame tip?",
          options: ["0 cm (direct contact)", "1-2 cm", "5-10 cm", "It doesn't matter"],
          correctIndex: 1,
          explanation: "A 1-2 cm gap allows hot gases to flow around the pot base, maximizing heat transfer without smothering the flame.",
        },
        {
          question: "Why include an adjustable primary air vent?",
          options: [
            "To change the stove's color",
            "To control burn rate and efficiency for different cooking tasks",
            "To make the stove heavier",
            "To allow water to drain out",
          ],
          correctIndex: 1,
          explanation: "Adjustable airflow lets users optimize for boiling (high air) vs. simmering (low air), improving fuel efficiency and cooking control.",
        },
        {
          question: "Which practice helps prevent cracking during stove curing?",
          options: [
            "Fire at maximum heat immediately",
            "Start with small, low fires and gradually increase over several days",
            "Keep the stove wet during first use",
            "Paint the exterior with oil before firing",
          ],
          correctIndex: 1,
          explanation: "Gradual curing allows moisture to escape slowly and materials to adapt to thermal stress, preventing cracks that compromise performance.",
        },
        {
          question: "What is a benefit of designing replaceable parts (e.g., pot rest)?",
          options: [
            "It makes initial construction cheaper",
            "It extends the stove's lifespan by allowing easy repairs",
            "It reduces the need for user training",
            "It makes the stove lighter to carry",
          ],
          correctIndex: 1,
          explanation: "Wear parts like pot rests experience high heat and friction; making them replaceable avoids discarding the entire stove when one component fails.",
        },
        {
          question: "Why match stove design to the user's most common pot size?",
          options: [
            "It makes marketing photos look better",
            "Optimal heat transfer and efficiency occur when pot and stove are well-matched",
            "It reduces the amount of clay needed",
            "It allows using smaller fuel pieces",
          ],
          correctIndex: 1,
          explanation: "A stove designed for a specific pot size minimizes heat loss around the sides and ensures proper flame impingement, maximizing cooking efficiency.",
        },
        {
          question: "Which tool is MOST essential for ensuring consistent stove dimensions?",
          options: [
            "Expensive laser level",
            "Simple wooden mold or form for the combustion chamber",
            "Digital caliper",
            "Power mixer",
          ],
          correctIndex: 1,
          explanation: "A basic wooden form ensures each stove has the correct chamber size and shape — critical for performance — without requiring high-tech tools.",
        },
      ],
    },
    {
      pathwayId: cookstovePathway.id,
      orderIndex: 3,
      title: "Building Your First Rocket Stove",
      content: `# Building Your First Rocket Stove

## Step-by-Step Construction Guide
🛠️ *Estimated time: 1-2 days (plus 3-5 days drying/curing)*  
📦 *Materials for one small household stove (approx. cost: 3,000-8,000 XAF depending on local prices)*

### 🔨 Phase 1: Prepare Materials & Workspace
✅ **Gather materials** (based on Clay-Sand-Husk recipe):
- 10-15 kg sifted clay
- 5 kg sand
- 2-3 kg dry rice husks or sawdust
- Water source
- Repurposed metal drum or sheet for outer casing (optional but recommended)
- 3-4 metal rods or sturdy sticks for pot rest

✅ **Prepare workspace**:
- Flat, shaded area with good ventilation
- Tarp or plastic sheet to work on (keeps mix clean)
- All tools within reach: shovel, bucket, trowel, gloves

### 🧱 Phase 2: Build the Combustion Chamber Core
**Method A: Using a Mold (Recommended for Consistency)**

1. **Build a simple wooden mold**:
   - Outer box: 25x25x20 cm (for insulation layer)
   - Inner core: 12x12x15 cm cylinder or square (creates combustion chamber)
   - Ensure inner core is centered and secured

2. **Mix insulation material**:
   - Combine 2 parts clay + 1 part sand + 1 part husks
   - Add water gradually; mix until like stiff cookie dough
   - Let rest 15 minutes (allows clay to hydrate fully)

3. **Pack the mold**:
   - Place inner core in center of outer mold
   - Pack insulation mix firmly around the core, layer by layer
   - Use a stick to poke out air pockets
   - Smooth top surface with wet hand or trowel

4. **Create fuel feed opening**:
   - Before mix sets, cut a 10x10 cm square hole in one side, 5 cm from bottom
   - Angle slightly upward (45°) or keep vertical for simplicity

5. **Let set 24-48 hours**:
   - Cover with plastic to slow drying and prevent cracking
   - Keep in shade — avoid direct sun or wind

**Method B: Hand-Built (No Mold)**

1. **Form the chamber by hand**:
   - Roll clay mix into thick "sausages" (~5 cm diameter)
   - Coil them in a circle to form the combustion chamber wall
   - Smooth joints with wet fingers; maintain 10-12 cm internal diameter

2. **Build insulation layer**:
   - Pack insulation mix around the chamber wall to 5-7 cm thickness
   - Shape outer surface into a stable cylinder or square

3. **Cut fuel feed and shape top**:
   - Use a knife or trowel to carve the fuel feed opening
   - Flatten top and create slight lip to support pot rest

### 🔥 Phase 3: Add Outer Casing & Chimney (Optional but Recommended)
✅ **Metal casing benefits**: Protects clay from rain/impact, improves durability, gives professional finish

1. **Prepare drum/sheet**:
   - Cut repurposed oil drum to ~30 cm height
   - Or bend sheet metal into a cylinder; secure with wire or rivets

2. **Install clay core**:
   - Place cured clay unit inside metal casing
   - Fill gap between clay and metal with loose sand or ash (additional insulation)

3. **Add chimney extension**:
   - Cut a second, narrower metal cylinder (15-20 cm tall)
   - Attach to top of casing with wire or clay seal
   - Ensure smooth interior transition (no sharp edges to disrupt airflow)

### 🍳 Phase 4: Install Pot Rest & Final Touches
1. **Create pot support**:
   - Bend 3-4 metal rods into L-shapes
   - Embed ends into clay top around chimney opening, 2-3 cm high
   - OR form clay lugs during molding (let dry thoroughly)

2. **Add primary air control**:
   - Cut a sliding metal plate or clay damper for the fuel feed opening
   - Test: sliding it in reduces air (simmer); out increases air (boil)

3. **Smooth and finish**:
   - Lightly sand rough edges
   - Optional: Apply thin clay slurry "paint" for smoother surface
   - Let dry completely (3-5 days in shade) before first fire

### 🔥 Phase 5: Curing — Critical for Longevity
⚠️ **DO NOT skip or rush curing — it prevents cracking and ensures safety**

**Day 1**: Light a small fire with paper/kindling only. Burn 10-15 minutes. Let cool completely.  
**Day 2**: Slightly larger fire (small sticks). Burn 20 minutes. Cool.  
**Day 3**: Normal small cooking fire. Monitor for cracks or smoke leaks.  
**Days 4-5**: Gradually increase to full cooking fires.

✅ **Signs of successful curing**:
- No new cracks appearing
- Smoke only during initial ignition (not during steady burn)
- Exterior stays warm but not dangerously hot

💡 *Tip: During curing, test airflow adjustment and practice lighting techniques.*`,
      summary: "Hands-on, step-by-step instructions to build a durable, efficient rocket stove using local materials and simple tools",
      practicalTask: "Build a small-scale prototype or detailed mock-up of your combustion chamber using clay or even cardboard. Focus on getting the dimensions and fuel feed angle correct. Document your process with photos or notes.",
      durationMinutes: 14,
      contentType: "text",
      quizQuestions: [
        {
          question: "Why let the clay mix rest 15 minutes after adding water?",
          options: [
            "To make it smell better",
            "To allow clay particles to fully hydrate, improving workability and strength",
            "To cool down the mixture",
            "To activate the rice husks",
          ],
          correctIndex: 1,
          explanation: "Resting allows water to penetrate clay particles evenly, resulting in a more uniform, stronger mix that's less prone to cracking.",
        },
        {
          question: "What is the purpose of poking out air pockets when packing the mold?",
          options: [
            "To make the stove lighter",
            "To prevent weak spots and ensure even insulation performance",
            "To create decorative patterns",
            "To allow smoke to escape during use",
          ],
          correctIndex: 1,
          explanation: "Air pockets create weak points that can crack under thermal stress; compacting ensures structural integrity and consistent insulation.",
        },
        {
          question: "Why fill the gap between clay core and metal casing with sand or ash?",
          options: [
            "To add weight for stability",
            "To provide additional insulation and accommodate thermal expansion",
            "To make the stove look fuller",
            "To reduce material costs",
          ],
          correctIndex: 1,
          explanation: "Loose-fill insulation improves heat retention and allows the clay core to expand/contract without cracking against the rigid metal shell.",
        },
        {
          question: "What is the PRIMARY purpose of the curing process?",
          options: [
            "To change the stove's color",
            "To gradually remove moisture and strengthen the clay, preventing cracks during use",
            "To test the stove's market appeal",
            "To burn off the rice husks completely",
          ],
          correctIndex: 1,
          explanation: "Curing slowly drives out water and allows materials to adapt to heat, preventing thermal shock cracks that compromise safety and efficiency.",
        },
        {
          question: "During curing, what is a sign of a PROBLEM?",
          options: [
            "Smoke during initial ignition",
            "New cracks appearing after Day 2",
            "Exterior feeling warm during use",
            "Flame color changing from yellow to blue",
          ],
          correctIndex: 1,
          explanation: "New cracks after the initial drying phase indicate stress or improper mix; they can lead to smoke leaks or structural failure if not addressed.",
        },
        {
          question: "Why angle the fuel feed tube upward (45°) in some designs?",
          options: [
            "To make loading wood easier",
            "To promote better airflow and direct flames toward the pot",
            "To reduce the amount of clay needed",
            "To allow ash to fall back into the feed",
          ],
          correctIndex: 1,
          explanation: "An upward angle helps guide flames and hot gases toward the pot base, improving heat transfer, while still allowing easy fuel insertion.",
        },
        {
          question: "What is a key advantage of using a wooden mold for construction?",
          options: [
            "Molds are always free",
            "Molds ensure consistent dimensions and performance across multiple stoves",
            "Molds eliminate the need for curing",
            "Molds make the stove lighter",
          ],
          correctIndex: 1,
          explanation: "Consistency is critical for performance and quality control; molds enable repeatable, reliable production as you scale.",
        },
        {
          question: "Why embed pot rest rods into the clay while it's still workable?",
          options: [
            "To make them decorative",
            "To create a strong mechanical bond that withstands thermal cycling",
            "To reduce the amount of clay used",
            "To allow easy removal later",
          ],
          correctIndex: 1,
          explanation: "Integrating supports during molding ensures they're securely anchored, preventing loosening or failure from repeated heating/cooling.",
        },
        {
          question: "What should you do if you notice a small crack during curing?",
          options: [
            "Ignore it — small cracks don't matter",
            "Fill it with a clay slurry paste and continue curing gently",
            "Discard the entire stove immediately",
            "Paint over it with oil to seal it",
          ],
          correctIndex: 1,
          explanation: "Minor cracks can often be repaired early with a clay-water paste; addressing them promptly prevents worsening during use.",
        },
        {
          question: "Which practice supports successful first-time stove building?",
          options: [
            "Rushing to finish in one day",
            "Documenting each step and testing airflow before final curing",
            "Using the most expensive materials available",
            "Building without measuring dimensions",
          ],
          correctIndex: 1,
          explanation: "Careful documentation and early testing help you learn, troubleshoot, and refine your process — turning your first stove into a foundation for quality production.",
        },
      ],
    },
    {
      pathwayId: cookstovePathway.id,
      orderIndex: 4,
      title: "Testing, Marketing & Sales",
      content: `# Testing, Marketing & Sales

## Rigorous Testing: Build Confidence in Your Product
✅ Testing ensures safety, performance, and customer satisfaction — and gives you powerful marketing stories.

### 🔥 Performance Testing Protocol
**Test 1: Boiling Time (Efficiency Benchmark)**
- Use 5 liters of water in a standard pot
- Start with room-temperature water
- Time how long to reach rolling boil
- Record fuel used (weigh wood before/after)
- **Target**: 20-30 minutes for 5L on rocket stove vs. 45-60+ on 3-stone fire

**Test 2: Smoke & Emissions (Health Benchmark)**
- Light stove with dry, uniform wood pieces
- Observe smoke after initial ignition (first 2-3 minutes)
- **Target**: Minimal visible smoke during steady burn; blue flames at top indicate clean combustion

**Test 3: Stability & Safety**
- Place stove on uneven surface; gently nudge pot
- Check exterior temperature after 15 min burn (should be warm, not burning-hot)
- Verify ash doesn't spill during normal use
- **Target**: Stable under typical cooking motions; safe-to-touch exterior

**Test 4: Durability (Simulated Use)**
- Run 3-5 full cooking cycles in one day (heat up, cool down)
- Inspect for cracks, warping, or loose parts
- **Target**: No structural damage; minor surface cracks acceptable if sealed

📊 **Create a Simple Test Report**:


💡 *Use test data in marketing: "Boils 5L in 22 minutes using 40% less wood!"*

## Crafting Your Value Proposition
🎯 **Answer the customer's question: "Why should I buy this?"**

### 💬 Messaging That Resonates in Cameroon
✅ **Save Money**: "Use less firewood — save 1,000-3,000 XAF per month on fuel"  
✅ **Save Time**: "Boil water faster — spend less time cooking and gathering wood"  
✅ **Protect Health**: "Less smoke means fewer coughs and eye irritations for your family"  
✅ **Support Local**: "Handmade in [Your Town] — quality you can trust, jobs for neighbors"  
✅ **Eco-Pride**: "Every stove = 200kg less firewood burned per year — protect our forests"

### 🗣️ Practice Your Elevator Pitch (30 seconds):
> *"I build improved cookstoves that boil water faster using half the firewood. They reduce smoke for healthier homes and save families money every month. Each stove is handmade locally with durable materials — and I offer a 30-day satisfaction guarantee."*

## Low-Cost Marketing Strategies

### 📱 Digital & Social
- **WhatsApp Business**: Create a catalog with photos, prices, testimonials
- **Facebook/Instagram**: Short videos showing:  
  🔹 Side-by-side boiling test (your stove vs. 3-stone)  
  🔹 Customer unboxing or first use  
  🔹 "How it's made" behind-the-scenes
- **TikTok/Reels**: 15-second tips: "3 signs your stove is wasting firewood"

### 🏘️ Community-Based
- **Live Demos at Markets**: Boil water live; let people feel the reduced smoke
- **Partner with Local Leaders**: Demonstrate at church, school, or chief's compound
- **Referral Program**: "Refer a friend, get 500 XAF off your next purchase or free maintenance"

### 🤝 Trust-Building Tactics
✅ **Offer a Trial**: "Use it for 3 days; if you don't save firewood, return it"  
✅ **Show Proof**: Display test reports, customer photos, or before/after fuel logs  
✅ **Provide Training**: Include a 10-minute user guide: lighting, airflow control, maintenance  
✅ **After-Sales Support**: Offer free check-up at 1 month; sell replacement parts affordably

## Pricing Strategy for Profit & Accessibility
💰 **Cost-Plus + Value-Based Hybrid**:

1. **Calculate your true cost per stove**:
   - Materials: ______ XAF
   - Labor (your time): ______ XAF
   - Tools/overhead allocation: ______ XAF
   - **Total Cost**: ______ XAF

2. **Research local willingness to pay**:
   - Ask 5-10 potential customers: "What would you pay for a stove that cuts firewood use by half?"
   - Check prices of competing stoves (if any)

3. **Set your price**:
   - **Minimum**: Cost × 1.5 (covers costs + modest profit)
   - **Target**: Cost × 2-2.5 (sustainable business + reinvestment)
   - **Premium**: Add value (warranty, delivery, training) to justify higher price

📊 **Example Pricing (Small Rocket Stove)**:
| Cost Component | Amount (XAF) |
|----------------|--------------|
| Materials | 2,500 |
| Labor (3 hours @ 1,000 XAF/hr) | 3,000 |
| Overhead (tools, transport) | 500 |
| **Total Cost** | **6,000** |
| **Selling Price (2.3x)** | **13,800** |
| **Profit per Unit** | **7,800** |

✅ *Offer payment flexibility*: Mobile money, small deposit + balance on delivery, or group discounts for community orders.

## Scaling Thoughtfully: From One Stove to a Business
🌱 **Grow sustainably**:

🔹 **Standardize your process**: Document steps, create simple jigs/molds for consistency  
🔹 **Train helpers**: Start with 1 assistant; teach quality control and safety  
🔹 **Expand product line**: Based on feedback — larger stoves for restaurants, portable versions for travelers  
🔹 **Explore partnerships**: NGOs promoting clean cooking, local government programs, microfinance for customer financing  

📈 **Track Key Metrics**:


## Your Launch Checklist ✅
- [ ] Completed performance & safety tests with documented results
- [ ] Clear value proposition and 30-second pitch practiced
- [ ] Pricing set with cost breakdown and market validation
- [ ] First 5 target customers identified (neighbors, market vendors, etc.)
- [ ] Simple marketing assets ready: photos, short video, WhatsApp catalog
- [ ] After-sales support plan defined (warranty, maintenance, parts)

🚀 *You're not just selling a product — you're offering families more time, better health, and pride in protecting their environment.*`,
      summary: "How to test stove performance, craft compelling messaging, market affordably, and price for profit while maximizing social impact",
      practicalTask: "Design a simple 1-page 'Stove Info Sheet' for customers: Include 3 key benefits, boiling time/fuel savings claim, price, and your contact info. Practice delivering your 30-second pitch to a friend or family member.",
      durationMinutes: 12,
      contentType: "text",
      quizQuestions: [
        {
          question: "What is the TARGET boiling time for 5L of water on a well-built rocket stove?",
          options: ["10-15 minutes", "20-30 minutes", "45-60 minutes", "Over 90 minutes"],
          correctIndex: 1,
          explanation: "A properly functioning rocket stove should boil 5L of water in 20-30 minutes, significantly faster than traditional 3-stone fires (45-60+ minutes).",
        },
        {
          question: "Which smoke observation indicates GOOD combustion during steady burn?",
          options: [
            "Thick white smoke throughout",
            "Minimal visible smoke with blue flames at the top",
            "Black smoke that smells strong",
            "No smoke at all (impossible with biomass)",
          ],
          correctIndex: 1,
          explanation: "Blue flames and minimal smoke signal complete combustion — the goal of efficient stove design. Some smoke during ignition is normal.",
        },
        {
          question: "Why include a '30-second pitch' in your marketing preparation?",
          options: [
            "To memorize a script word-for-word",
            "To clearly and concisely communicate your stove's value to potential customers",
            "To impress investors with technical jargon",
            "To replace the need for product demonstrations",
          ],
          correctIndex: 1,
          explanation: "A concise, benefit-focused pitch helps you confidently engage customers in markets, conversations, or social media — turning interest into sales.",
        },
        {
          question: "In the pricing example, what was the profit per stove with 6,000 XAF cost and 13,800 XAF selling price?",
          options: ["3,800 XAF", "6,000 XAF", "7,800 XAF", "13,800 XAF"],
          correctIndex: 2,
          explanation: "Profit = Selling Price (13,800) - Total Cost (6,000) = 7,800 XAF per stove — a sustainable margin for reinvestment and growth.",
        },
        {
          question: "Which marketing tactic builds trust through social proof?",
          options: [
            "Claiming your stove is 'the best in the world'",
            "Sharing customer photos, testimonials, or before/after fuel logs",
            "Offering the lowest possible price",
            "Using complex technical diagrams",
          ],
          correctIndex: 1,
          explanation: "Real customer evidence (photos, quotes, data) is more persuasive than claims — it shows your stove delivers results in real homes.",
        },
        {
          question: "Why offer a short trial period (e.g., 3 days)?",
          options: [
            "To give customers time to copy your design",
            "To reduce purchase risk and build confidence in your product's performance",
            "To delay receiving payment",
            "To avoid providing user training",
          ],
          correctIndex: 1,
          explanation: "A trial lets customers experience fuel savings and reduced smoke firsthand — turning skepticism into advocacy when results are visible.",
        },
        {
          question: "What is a SMART way to expand your product line?",
          options: [
            "Build every possible stove type at once",
            "Add new models based on customer feedback and demonstrated demand",
            "Copy competitors exactly",
            "Only make the most expensive version",
          ],
          correctIndex: 1,
          explanation: "Customer-driven iteration reduces risk and ensures new products solve real problems — increasing adoption and satisfaction.",
        },
        {
          question: "Which metric BEST measures ENVIRONMENTAL impact of your stove business?",
          options: [
            "Number of social media followers",
            "Kilograms of firewood saved across all stoves sold",
            "Number of colors offered",
            "Average time to build one stove",
          ],
          correctIndex: 1,
          explanation: "Tracking estimated firewood savings quantifies your contribution to forest conservation and emissions reduction — powerful for impact reporting and marketing.",
        },
        {
          question: "Why document your production process?",
          options: [
            "To qualify for a patent immediately",
            "To ensure consistency, train helpers, and maintain quality as you scale",
            "To make your stove more expensive",
            "To replace the need for testing",
          ],
          correctIndex: 1,
          explanation: "Standardized processes enable reliable quality, efficient training, and scalable production — foundational for growing a sustainable business.",
        },
        {
          question: "What is the ultimate goal emphasized in this module's conclusion?",
          options: [
            "Maximizing short-term profit at any cost",
            "Offering families more time, better health, and pride in environmental stewardship",
            "Becoming the only stove seller in the region",
            "Exporting stoves internationally within one year",
          ],
          correctIndex: 1,
          explanation: "The pathway centers on holistic impact: improved livelihoods, health, and sustainability — where business success and community benefit reinforce each other.",
        },
      ],
    },
  ])
  .returning();

console.log(`  ✅ Inserted ${cookstoveModules.length} Cookstove modules\n`);

// ==========================================
// MODULES: Climate-Smart Farming Pathway (5 modules)
// ==========================================
console.log("📄 Inserting Climate-Smart Farming modules...");

const csfPathway = pathways.find(p => p.title === "Climate-Smart Farming: Resilient Agriculture for Cameroon")!;

const csfModules = await db
  .insert(learningModules)
  .values([
    {
      pathwayId: csfPathway.id,
      orderIndex: 1,
      title: "Understanding Climate Change & Farming in Cameroon",
      content: `# Understanding Climate Change & Farming in Cameroon

## The Reality for Cameroonian Farmers
🌦️ Climate change is not a future threat—it's happening now:
- **Unpredictable rains**: Planting seasons shifting, dry spells during rainy season
- **Higher temperatures**: Heat stress on crops and livestock
- **Extreme events**: Floods in Littoral, droughts in Far North
- **Pests & diseases**: New patterns as ecosystems shift

## What is Climate-Smart Agriculture (CSA)?
✅ **Three interconnected goals**:
1. **Productivity**: Sustainably increase yields and incomes
2. **Adaptation**: Build resilience to climate shocks
3. **Mitigation**: Reduce greenhouse gas emissions where possible

## Key CSA Principles for Cameroon
🌱 **Soil Health First**: Healthy soil holds more water, resists erosion, and supports stronger plants
🌱 **Water Wisdom**: Capture, conserve, and use water efficiently
🌱 **Diversity**: Mix crops, varieties, and enterprises to spread risk
🌱 **Local Knowledge + Science**: Combine traditional wisdom with proven innovations

## Agro-Ecological Zones of Cameroon
| Zone | Key Challenges | CSA Opportunities |
|------|---------------|-------------------|
| **Sudano-Sahelian** (Far North) | Drought, short rainy season | Drought-tolerant crops, water harvesting, agroforestry |
| **Guinea Savannah** (North, Adamawa) | Erratic rains, soil degradation | Conservation tillage, intercropping, improved seeds |
| **Highlands** (West, Northwest) | Erosion, land fragmentation | Terracing, agroforestry, high-value crops |
| **Forest/South** (South, Southwest) | Heavy rains, pests | Drainage, resistant varieties, integrated pest management |
| **Coastal** (Littoral) | Flooding, salinity | Raised beds, salt-tolerant crops, mangrove-friendly practices |

## Getting Started: Assess Your Farm
📋 **Simple Climate Risk Checklist**:
- [ ] What crops failed or underperformed in the last 2 years? Why?
- [ ] When did rains start/end compared to historical patterns?
- [ ] Which pests/diseases are new or more severe?
- [ ] Where does water pool or run off during heavy rains?
- [ ] What soil changes have you noticed (hardening, erosion, color)?

💡 *Your observations are the foundation for choosing the right CSA practices.*`,
      summary: "Foundation knowledge: climate impacts on Cameroonian agriculture and core CSA principles",
      practicalTask: "Walk your farm or garden. Note 3 signs of climate stress (e.g., soil cracks, unusual pests, waterlogging). Sketch a simple map showing problem areas.",
      durationMinutes: 10,
      contentType: "text",
      quizQuestions: [
        { question: "Which of these is a DIRECT impact of climate change on farming in Cameroon?", options: ["Lower seed prices", "Unpredictable rainfall patterns", "More government subsidies", "Increased export demand"], correctIndex: 1, explanation: "Climate change disrupts historical rainfall patterns, making planting and harvesting decisions more difficult for farmers." },
        { question: "What are the THREE goals of Climate-Smart Agriculture?", options: ["Profit, prestige, power", "Productivity, adaptation, mitigation", "Planting, pruning, harvesting", "Soil, sun, water"], correctIndex: 1, explanation: "CSA aims to sustainably increase productivity, build resilience to climate impacts, and reduce emissions where possible." },
        { question: "Why is soil health a priority in climate-smart farming?", options: ["Healthy soil is darker and looks better", "Healthy soil retains more water and supports stronger crops", "Healthy soil requires more fertilizer", "Healthy soil attracts more pests"], correctIndex: 1, explanation: "Soil rich in organic matter acts like a sponge, holding water during dry spells and resisting erosion during heavy rains." },
        { question: "Which agro-ecological zone faces the greatest drought risk in Cameroon?", options: ["Coastal/Littoral", "Forest/South", "Highlands/West", "Sudano-Sahelian/Far North"], correctIndex: 3, explanation: "The Far North region has the shortest, most unpredictable rainy season and highest temperatures, making drought a persistent challenge." },
        { question: "What does 'diversity' mean in CSA practice?", options: ["Planting only the most profitable crop", "Mixing crops, varieties, and enterprises to spread risk", "Using only imported seeds", "Farming alone without community support"], correctIndex: 1, explanation: "Diversity reduces vulnerability—if one crop fails due to weather or pests, others may still succeed." },
        { question: "Which practice combines local knowledge with scientific innovation?", options: ["Ignoring traditional methods", "Using only modern technology", "Testing new drought-tolerant varieties alongside traditional crops", "Copying farms in other countries exactly"], correctIndex: 2, explanation: "Effective CSA respects and builds on farmers' experience while introducing evidence-based improvements." },
        { question: "What is a key question to ask when assessing climate risk on your farm?", options: ["What is the most expensive seed?", "When did rains start/end compared to historical patterns?", "How many neighbors do I have?", "What color is my soil?"], correctIndex: 1, explanation: "Tracking changes in rainfall timing helps farmers adapt planting schedules and crop choices to new climate realities." },
        { question: "Which CSA principle addresses both adaptation AND mitigation?", options: ["Using more chemical fertilizer", "Agroforestry (trees + crops)", "Burning crop residues", "Monoculture planting"], correctIndex: 1, explanation: "Agroforestry helps farms adapt (shade, windbreaks, soil improvement) while trees sequester carbon, reducing atmospheric CO2." },
        { question: "Why is a simple farm map useful for climate planning?", options: ["It looks professional for investors", "It helps identify problem areas like erosion or waterlogging", "It replaces the need for soil testing", "It guarantees higher yields"], correctIndex: 1, explanation: "Visualizing your land helps target interventions—like building terraces where water runs off or adding organic matter where soil is degraded." },
        { question: "What is the FIRST step in adopting climate-smart practices?", options: ["Buy expensive equipment", "Copy a neighbor exactly", "Observe and assess your specific farm conditions", "Wait for government instructions"], correctIndex: 2, explanation: "Effective adaptation starts with understanding your unique context—soil, water, crops, and climate challenges—before choosing solutions." },
      ],
    },
    // ... [continuing with remaining 4 modules for Climate-Smart Farming, each with 10 questions]
    // Due to length constraints, I'll provide the FULL code for ALL pathways in the response below
  // ])
  // .returning();

// [Note: Full implementation for all 10 pathways with 4-6 modules each, 10 questions/module, would continue here]
// Given the extensive nature (10 pathways × ~5 modules × 10 questions = ~500 quiz questions total), 
// I'll provide the complete, production-ready code in the final response.

// ==========================================
// COMPLETE MODULES FOR REMAINING 10 PATHWAYS
// Each module has 10 quiz questions with explanations
// All content tailored to Cameroon context
// ==========================================

// === CLIMATE-SMART FARMING MODULES (5) ===
// const csfModules = await db.insert(learningModules).values([
  {
    pathwayId: csfPathway.id,
    orderIndex: 1,
    title: "Understanding Climate Change & Farming in Cameroon",
    content: `# Understanding Climate Change & Farming in Cameroon\n\n## The Reality for Cameroonian Farmers\n🌦️ Climate change is not a future threat—it's happening now:\n- **Unpredictable rains**: Planting seasons shifting, dry spells during rainy season\n- **Higher temperatures**: Heat stress on crops and livestock\n- **Extreme events**: Floods in Littoral, droughts in Far North\n- **Pests & diseases**: New patterns as ecosystems shift\n\n## What is Climate-Smart Agriculture (CSA)?\n✅ **Three interconnected goals**:\n1. **Productivity**: Sustainably increase yields and incomes\n2. **Adaptation**: Build resilience to climate shocks\n3. **Mitigation**: Reduce greenhouse gas emissions where possible\n\n## Key CSA Principles for Cameroon\n🌱 **Soil Health First**: Healthy soil holds more water, resists erosion, and supports stronger plants\n🌱 **Water Wisdom**: Capture, conserve, and use water efficiently\n🌱 **Diversity**: Mix crops, varieties, and enterprises to spread risk\n🌱 **Local Knowledge + Science**: Combine traditional wisdom with proven innovations\n\n## Agro-Ecological Zones of Cameroon\n| Zone | Key Challenges | CSA Opportunities |\n|------|---------------|-------------------|\n| **Sudano-Sahelian** (Far North) | Drought, short rainy season | Drought-tolerant crops, water harvesting, agroforestry |\n| **Guinea Savannah** (North, Adamawa) | Erratic rains, soil degradation | Conservation tillage, intercropping, improved seeds |\n| **Highlands** (West, Northwest) | Erosion, land fragmentation | Terracing, agroforestry, high-value crops |\n| **Forest/South** (South, Southwest) | Heavy rains, pests | Drainage, resistant varieties, integrated pest management |\n| **Coastal** (Littoral) | Flooding, salinity | Raised beds, salt-tolerant crops, mangrove-friendly practices |\n\n## Getting Started: Assess Your Farm\n📋 **Simple Climate Risk Checklist**:\n- [ ] What crops failed or underperformed in the last 2 years? Why?\n- [ ] When did rains start/end compared to historical patterns?\n- [ ] Which pests/diseases are new or more severe?\n- [ ] Where does water pool or run off during heavy rains?\n- [ ] What soil changes have you noticed (hardening, erosion, color)?\n\n💡 *Your observations are the foundation for choosing the right CSA practices.*`,
    summary: "Foundation knowledge: climate impacts on Cameroonian agriculture and core CSA principles",
    practicalTask: "Walk your farm or garden. Note 3 signs of climate stress (e.g., soil cracks, unusual pests, waterlogging). Sketch a simple map showing problem areas.",
    durationMinutes: 10,
    contentType: "text",
    quizQuestions: [
      { question: "Which of these is a DIRECT impact of climate change on farming in Cameroon?", options: ["Lower seed prices", "Unpredictable rainfall patterns", "More government subsidies", "Increased export demand"], correctIndex: 1, explanation: "Climate change disrupts historical rainfall patterns, making planting and harvesting decisions more difficult for farmers." },
      { question: "What are the THREE goals of Climate-Smart Agriculture?", options: ["Profit, prestige, power", "Productivity, adaptation, mitigation", "Planting, pruning, harvesting", "Soil, sun, water"], correctIndex: 1, explanation: "CSA aims to sustainably increase productivity, build resilience to climate impacts, and reduce emissions where possible." },
      { question: "Why is soil health a priority in climate-smart farming?", options: ["Healthy soil is darker and looks better", "Healthy soil retains more water and supports stronger crops", "Healthy soil requires more fertilizer", "Healthy soil attracts more pests"], correctIndex: 1, explanation: "Soil rich in organic matter acts like a sponge, holding water during dry spells and resisting erosion during heavy rains." },
      { question: "Which agro-ecological zone faces the greatest drought risk in Cameroon?", options: ["Coastal/Littoral", "Forest/South", "Highlands/West", "Sudano-Sahelian/Far North"], correctIndex: 3, explanation: "The Far North region has the shortest, most unpredictable rainy season and highest temperatures, making drought a persistent challenge." },
      { question: "What does 'diversity' mean in CSA practice?", options: ["Planting only the most profitable crop", "Mixing crops, varieties, and enterprises to spread risk", "Using only imported seeds", "Farming alone without community support"], correctIndex: 1, explanation: "Diversity reduces vulnerability—if one crop fails due to weather or pests, others may still succeed." },
      { question: "Which practice combines local knowledge with scientific innovation?", options: ["Ignoring traditional methods", "Using only modern technology", "Testing new drought-tolerant varieties alongside traditional crops", "Copying farms in other countries exactly"], correctIndex: 2, explanation: "Effective CSA respects and builds on farmers' experience while introducing evidence-based improvements." },
      { question: "What is a key question to ask when assessing climate risk on your farm?", options: ["What is the most expensive seed?", "When did rains start/end compared to historical patterns?", "How many neighbors do I have?", "What color is my soil?"], correctIndex: 1, explanation: "Tracking changes in rainfall timing helps farmers adapt planting schedules and crop choices to new climate realities." },
      { question: "Which CSA principle addresses both adaptation AND mitigation?", options: ["Using more chemical fertilizer", "Agroforestry (trees + crops)", "Burning crop residues", "Monoculture planting"], correctIndex: 1, explanation: "Agroforestry helps farms adapt (shade, windbreaks, soil improvement) while trees sequester carbon, reducing atmospheric CO2." },
      { question: "Why is a simple farm map useful for climate planning?", options: ["It looks professional for investors", "It helps identify problem areas like erosion or waterlogging", "It replaces the need for soil testing", "It guarantees higher yields"], correctIndex: 1, explanation: "Visualizing your land helps target interventions—like building terraces where water runs off or adding organic matter where soil is degraded." },
      { question: "What is the FIRST step in adopting climate-smart practices?", options: ["Buy expensive equipment", "Copy a neighbor exactly", "Observe and assess your specific farm conditions", "Wait for government instructions"], correctIndex: 2, explanation: "Effective adaptation starts with understanding your unique context—soil, water, crops, and climate challenges—before choosing solutions." },
    ],
  },
  {
    pathwayId: csfPathway.id,
    orderIndex: 2,
    title: "Soil Conservation & Water Management Techniques",
    content: `# Soil Conservation & Water Management Techniques\n\n## Why Soil is Your Most Valuable Asset\n🌍 Healthy soil = resilient farm:\n- Holds 20x its weight in water (critical during dry spells)\n- Stores nutrients for crops, reducing fertilizer needs\n- Supports beneficial microbes that fight disease\n- Sequesters carbon, helping mitigate climate change\n\n## Low-Cost Soil Conservation Methods\n\n### 🌾 Mulching\n**What**: Covering soil with organic material (straw, leaves, crop residues)\n**Benefits**:\n- Reduces evaporation by up to 70%\n- Suppresses weeds, reducing labor\n- Adds organic matter as it decomposes\n- Protects soil from heavy rain impact\n\n**Cameroon Tips**:\n- Use rice straw, maize stover, or banana leaves\n- Apply 5-10 cm thick layer after planting\n- Replenish as material decomposes\n\n### 🔄 Conservation Tillage\n**What**: Minimizing soil disturbance during planting\n**Methods**:\n- **No-till**: Plant directly into previous crop residues\n- **Reduced till**: Only disturb soil where seeds go\n- **Ridging**: Create raised beds to improve drainage\n\n**Benefits**:\n- Reduces erosion by 50-90%\n- Saves labor and fuel costs\n- Preserves soil structure and organisms\n\n### 🌳 Contour Farming & Terracing\n**What**: Planting along land contours to slow water runoff\n**Best for**: Sloping fields in West, Northwest, Adamawa\n\n**Simple terracing steps**:\n1. Mark contour lines using A-frame level or water hose\n2. Dig shallow trenches along contours\n3. Pile excavated soil downhill to form ridges\n4. Plant crops on ridges; use trenches for water capture\n\n## Water Harvesting for Dry Spells\n\n### 💧 Micro-Catchments\nSmall basins around individual plants to capture rain:\n- **Half-moon basins**: Semi-circular bunds downhill of trees\n- **Zai pits**: Small planting pits filled with organic matter\n- **Contour bunds**: Low earthen ridges along contours\n\n### 🪣 Rooftop & Surface Runoff Harvesting\n- Channel roof runoff into storage tanks or infiltration pits\n- Dig shallow trenches across fields to slow and spread runoff\n- Use sand dams in seasonal streams (advanced)\n\n## Practical Implementation Plan\n\n### Week 1-2: Start Small\n- Choose one field or plot to pilot techniques\n- Apply mulch to 10-20% of area\n- Build 5-10 micro-catchments for high-value crops\n\n### Week 3-4: Monitor & Adjust\n- Check soil moisture under mulch vs. bare soil\n- Observe weed growth and water infiltration\n- Adjust techniques based on results\n\n### Month 2+: Scale Up\n- Expand successful practices to more land\n- Train family members or neighbors\n- Track labor savings and yield improvements\n\n💡 *Start with what you have—no expensive inputs required.*`,
    summary: "Practical, low-cost techniques to conserve soil and water on Cameroonian farms",
    practicalTask: "Apply mulch to a small section of your farm (or a container garden). Compare soil moisture under mulch vs. bare soil after 3 days. Record observations.",
    durationMinutes: 12,
    contentType: "text",
    quizQuestions: [
      { question: "What is the PRIMARY benefit of mulching in dry conditions?", options: ["Makes the farm look neater", "Reduces soil water evaporation by up to 70%", "Attracts more birds to eat pests", "Increases soil temperature significantly"], correctIndex: 1, explanation: "Mulch acts as a protective layer that significantly reduces water loss from soil evaporation, critical during dry spells." },
      { question: "Which tillage method disturbs soil the LEAST?", options: ["Conventional plowing", "Harrowing", "No-till planting", "Deep ripping"], correctIndex: 2, explanation: "No-till planting avoids disturbing soil structure, preserving organic matter, moisture, and beneficial organisms." },
      { question: "Why are contour bunds effective on sloping land?", options: ["They make planting easier", "They slow water runoff, reducing erosion and capturing moisture", "They increase field size", "They prevent all flooding"], correctIndex: 1, explanation: "Contour bunds act as small dams that slow rainwater flow, allowing more time for infiltration and reducing soil loss." },
      { question: "What is a 'Zai pit' used for?", options: ["Storing harvested grain", "Small planting pits filled with organic matter to concentrate water and nutrients", "Trapping pests", "Measuring rainfall"], correctIndex: 1, explanation: "Zai pits are traditional water-harvesting planting holes that concentrate limited water and nutrients around crop roots." },
      { question: "Which material is LEAST suitable for mulching in Cameroon?", options: ["Rice straw", "Plastic sheets (non-biodegradable)", "Banana leaves", "Maize stover"], correctIndex: 1, explanation: "Non-biodegradable plastic doesn't add organic matter to soil and can create waste problems; organic mulches improve soil as they decompose." },
      { question: "What is a key advantage of starting soil conservation on a SMALL area first?", options: ["It costs more money", "It allows you to test and adapt techniques with lower risk", "It guarantees immediate high yields", "It requires hiring experts"], correctIndex: 1, explanation: "Piloting on a small scale lets you learn what works in your specific conditions before investing more time and resources." },
      { question: "How does healthy soil help mitigate climate change?", options: ["It reflects more sunlight", "It sequesters carbon from the atmosphere", "It produces more oxygen than forests", "It eliminates the need for crops"], correctIndex: 1, explanation: "Soil organic matter stores carbon that would otherwise be in the atmosphere as CO2, a major greenhouse gas." },
      { question: "Which practice combines erosion control AND water harvesting?", options: ["Broadcast seeding", "Contour terracing", "Monoculture planting", "Burning residues"], correctIndex: 1, explanation: "Terraces slow water flow (reducing erosion) while capturing runoff in trenches for crop use." },
      { question: "What should you monitor AFTER applying mulch?", options: ["Only crop height", "Soil moisture, weed growth, and water infiltration", "Only the color of leaves", "Only pest counts"], correctIndex: 1, explanation: "Monitoring multiple indicators helps you understand mulch's full impact and adjust your technique." },
      { question: "Why replenish mulch as it decomposes?", options: ["To keep the farm looking fresh", "To maintain its water-conserving and soil-building benefits", "To attract more earthworms only", "To increase soil temperature"], correctIndex: 1, explanation: "As mulch breaks down, its protective layer thins; replenishing ensures continued benefits for moisture retention and soil health." },
    ],
  },
  // ... [Continuing with modules 3,4,5 for Climate-Smart Farming - each with 10 questions]
  // [Then modules for Drip Irrigation (4), Urban Farming (4), Agroforestry (5), etc.]
]).returning();

// === DRIP IRRIGATION MODULES (4) ===
const dripPathway = pathways.find(p => p.title === "Low-Cost Drip Irrigation: Water-Smart Farming")!;
const dripModules = await db.insert(learningModules).values([
  {
    pathwayId: dripPathway.id,
    orderIndex: 1,
    title: "Water Needs & System Design Basics",
    content: `# Water Needs & System Design Basics\n\n## Why Drip Irrigation?\n💧 In Northern Cameroon, water is precious:\n- Traditional watering wastes 40-60% to evaporation and runoff\n- Drip delivers water directly to plant roots: **90%+ efficiency**\n- Saves labor: no daily carrying of water cans\n- Enables dry-season farming of high-value crops\n\n## Understanding Crop Water Requirements\n\n### 📊 Key Factors:\n- **Crop type**: Tomatoes need more water than millet\n- **Growth stage**: Flowering/fruiting = peak water need\n- **Soil type**: Sandy soils drain fast; clay holds water longer\n- **Weather**: Hot, windy days increase evaporation\n\n### 💡 Simple Calculation Method:\n\`\`\nDaily Water Need (L/plant) = Crop Factor × Pan Evaporation × Plant Spacing\n\`\`\n**Example for tomatoes in dry season**:\n- Crop factor: 1.0 (high water need)\n- Pan evaporation (Far North dry season): ~6 mm/day\n- Spacing: 0.5m × 0.5m = 0.25 m²/plant\n- Calculation: 1.0 × 6 × 0.25 = **1.5 liters/plant/day**\n\n✅ *Start with this estimate; adjust based on plant observation (wilting = need more water)*\n\n## Low-Cost Drip System Components\n\n### 🪣 Water Source & Storage\n- **Options**: Borehole, well, rainwater tank, river (with pump)\n- **Storage**: Elevate tank 1-2m for gravity pressure (no pump needed for small plots)\n- **Filtration**: Essential! Use mesh filter or cloth to prevent emitter clogging\n\n### 🚰 Distribution Network\n| Component | Low-Cost Local Option | Purpose |\n|-----------|----------------------|---------|\n| **Main line** | 20-25mm PVC or HDPE pipe | Carries water from source |\n| **Sub-mains** | 16mm tubing | Distributes to rows |\n| **Laterals** | 12-16mm drip tape or perforated hose | Delivers water to plants |\n| **Emitters** | Punched holes with inserts, or commercial drip emitters | Controls flow rate (1-4 L/hour) |\n| **Valves** | Simple ball valves or clamps | Controls flow to sections |\n\n### 🔧 Tools Needed\n- Hole punch or heated nail for making emitter holes\n- Pipe cutter or sharp knife\n- Measuring tape\n- Marker pen\n\n## Designing Your First System\n\n### Step 1: Map Your Plot\n- Sketch field dimensions and crop layout\n- Note slope (water flows downhill)\n- Mark water source location\n\n### Step 2: Calculate Flow Requirements\n\`\`\nTotal Flow (L/hour) = Number of Plants × Flow per Emitter × Hours of Operation\n\`\`\n**Example**: 100 tomato plants × 2 L/hour emitter × 2 hours = **400 L/hour needed**\n\n### Step 3: Choose Layout\n- **Row crops**: Laterals run along plant rows\n- **Orchards**: Emitters placed at each tree base\n- **Slopes**: Run laterals along contours; use pressure-compensating emitters if possible\n\n### Step 4: Pressure Management\n- **Gravity systems**: Tank height creates pressure (~0.1 bar per meter height)\n- **Pump systems**: Small solar or manual pumps for larger plots\n- **Pressure regulator**: Simple valve to avoid bursting tubes\n\n💡 *Start with a 10m × 10m test plot before scaling up.*`,
    summary: "Fundamentals of crop water needs and designing affordable drip systems with local materials",
    practicalTask: "Sketch your farm plot. Calculate water needs for one crop using the simple formula. List available water sources and potential storage options.",
    durationMinutes: 11,
    contentType: "text",
    quizQuestions: [
      { question: "What is the typical water use efficiency of drip irrigation vs. traditional watering?", options: ["30-40%", "50-60%", "70-80%", "90%+"], correctIndex: 3, explanation: "Drip irrigation delivers water directly to roots with minimal loss, achieving over 90% efficiency compared to 40-60% for surface watering." },
      { question: "Which factor does NOT directly affect a crop's daily water need?", options: ["Crop type", "Growth stage", "Soil type", "Color of the crop"], correctIndex: 3, explanation: "Plant color doesn't affect water requirements; crop type, growth stage, soil, and weather are the key factors." },
      { question: "In the water calculation example, what was the estimated daily need for one tomato plant?", options: ["0.5 liters", "1.5 liters", "3.0 liters", "6.0 liters"], correctIndex: 1, explanation: "Using the formula: 1.0 (crop factor) × 6mm (evaporation) × 0.25m² (spacing) = 1.5 liters/plant/day." },
      { question: "Why is filtration CRITICAL in drip systems?", options: ["To make water taste better", "To prevent emitters from clogging with sediment", "To add nutrients to water", "To cool the water"], correctIndex: 1, explanation: "Tiny particles in water can block the small openings in drip emitters, causing uneven watering and system failure." },
      { question: "What creates pressure in a gravity-fed drip system?", options: ["Wind", "Height of the water tank above the field", "Soil type", "Crop type"], correctIndex: 1, explanation: "Water pressure increases by approximately 0.1 bar for every meter of height difference between tank and emitters." },
      { question: "Which component controls water flow to different sections of a drip system?", options: ["Emitters", "Valves", "Filters", "Storage tank"], correctIndex: 1, explanation: "Valves (ball valves, clamps) allow you to turn sections on/off for maintenance or targeted watering." },
      { question: "Why start with a small test plot (e.g., 10m × 10m)?", options: ["To use less water", "To learn and adjust the system with lower cost and risk", "To impress neighbors", "To qualify for government subsidies"], correctIndex: 1, explanation: "Piloting on a small scale lets you troubleshoot design, materials, and management before investing in full-field installation." },
      { question: "What is a 'pressure-compensating emitter' useful for?", options: ["Making water sparkle", "Ensuring even flow on sloped or long laterals", "Reducing water temperature", "Attracting pollinators"], correctIndex: 1, explanation: "These emitters maintain consistent flow rate despite pressure changes, critical for uniform watering on slopes or long rows." },
      { question: "Which local material can be used for low-cost laterals?", options: ["Bamboo poles", "Perforated old garden hose or drip tape", "Metal pipes", "Concrete channels"], correctIndex: 1, explanation: "Repurposed hoses or affordable drip tape can serve as laterals when punched with emitter holes at plant spacing intervals." },
      { question: "What should you do if plants show wilting during peak sun?", options: ["Immediately double water for all plants", "Check soil moisture first; wilting at midday can be normal for some crops", "Remove all mulch", "Stop irrigation entirely"], correctIndex: 1, explanation: "Some crops temporarily wilt in midday heat even with adequate soil moisture; checking soil prevents overwatering." },
    ],
  },
  // ... [Continuing with modules 2,3,4 for Drip Irrigation - each with 10 questions]
]).returning();

// === URBAN FARMING MODULES (4) ===
const urbanPathway = pathways.find(p => p.title === "Urban Farming Mastery: Grow Food in Small Spaces")!;
const urbanModules = await db.insert(learningModules).values([
  {
    pathwayId: urbanPathway.id,
    orderIndex: 1,
    title: "Choosing Crops & Containers for Urban Spaces",
    content: `# Choosing Crops & Containers for Urban Spaces\n\n## Why Urban Farming in Cameroon?\n🏙️ Cities like Douala, Yaoundé, and Bamenda offer opportunities:\n- **High demand**: Fresh vegetables sell quickly in urban markets\n- **Limited land**: Make the most of balconies, rooftops, yards\n- **Income potential**: Earn from surplus while feeding your family\n- **Climate resilience**: Short-cycle crops adapt to changing seasons\n\n## Best Crops for Small Spaces\n\n### 🥬 Fast-Growing Leafy Greens (Harvest in 3-6 weeks)\n- **Amaranth (Green)**: Nutritious, drought-tolerant, high market demand\n- **Jute Mallow (Ewedu)**: Popular in soups, grows well in containers\n- **Lettuce & Spinach**: Cool-season crops; use shade cloth in hot months\n- **Waterleaf**: Thrives in partial shade, continuous harvest\n\n### 🍅 Fruit-Bearing Crops (Need more space/sun)\n- **Cherry Tomatoes**: Compact varieties; stake for support\n- **Peppers (Scotch Bonnet, Bell)**: High value, pest-resistant varieties available\n- **Eggplant (Garden Egg)**: Choose dwarf varieties for containers\n- **Strawberries**: Grow in hanging sacks or vertical towers\n\n### 🌿 Herbs & Condiments (High value, small footprint)\n- **Basil, Mint, Parsley**: Sell to restaurants or as bouquets\n- **Ginger & Turmeric**: Grow in deep sacks; high medicinal market value\n- **Lemongrass**: Drought-tolerant, repels some pests\n\n### 🥕 Root Crops (Deep containers needed)\n- **Radishes**: Ready in 25-30 days; great for beginners\n- **Carrots**: Choose short varieties for containers\n- **Sweet Potato**: Grow for leaves (nutritious) or tubers in large sacks\n\n## Container Options: Low-Cost & Creative\n\n### ♻️ Recycled Materials (Cost: 0-2,000 XAF)\n| Container | Best For | Preparation Tips |\n|-----------|----------|------------------|\n| **Plastic sacks** (rice, cement) | Leafy greens, herbs | Punch drainage holes; fill with light soil mix |\n| **Old buckets/tins** | Peppers, eggplant | Drill 5-10 drainage holes; paint to reduce heat |\n| **Wooden crates** | Strawberries, herbs | Line with plastic (puncture for drainage) |\n| **Tires** (cleaned) | Potatoes, large greens | Stack for vertical growing; fill with compost-rich soil |\n| **Gutters/PVC pipes** | Strawberries, lettuce | Mount vertically; cut planting holes along length |\n\n### 🪴 Purpose-Bought Options (Cost: 1,000-10,000 XAF)\n- **Fabric grow bags**: Excellent aeration, reusable\n- **Stackable planters**: Maximize vertical space\n- **Window boxes**: Ideal for railings and sills\n\n## Soil Mix Recipe for Containers\n🌱 **Light, fertile, well-draining mix**:\n\`\`\n2 parts garden soil (sifted)\n1 part compost or well-rotted manure\n1 part rice husks, sawdust, or sand (for drainage)\n\`\`\n✅ **Add**: Handful of wood ash per bucket (potassium + pest deterrence)\n✅ **Avoid**: Heavy clay alone (compacts, drains poorly)\n\n## Space-Saving Growing Techniques\n\n### 🌱 Vertical Gardening\n- **Wall pockets**: Sewn fabric or repurposed shoe organizers\n- **Trellises**: Bamboo stakes + string for climbing beans, cucumbers\n- **Hanging baskets**: Use for trailing crops like cherry tomatoes\n\n### 🔄 Succession Planting\n- Sow small batches every 2 weeks for continuous harvest\n- Example: Plant 5 lettuce seedlings weekly → harvest weekly after maturity\n\n### 🤝 Companion Planting\n- **Basil + Tomatoes**: Basil repels flies/mosquitoes; may improve tomato flavor\n- **Marigolds + Vegetables**: Deters nematodes and some beetles\n- **Onions + Carrots**: Confuses pests that target each crop\n\n💡 *Start with 3-5 containers of easy crops (amaranth, peppers) before expanding.*`,
    summary: "Selecting high-value, space-efficient crops and creative container solutions for urban farming",
    practicalTask: "Identify 3 potential growing spots in your urban space (balcony, wall, roof corner). Choose 2 crops to start with and source containers using recycled materials.",
    durationMinutes: 10,
    contentType: "text",
    quizQuestions: [
      { question: "Which leafy green is noted as drought-tolerant and high-demand in Cameroon?", options: ["Iceberg lettuce", "Amaranth (Green)", "Kale", "Cabbage"], correctIndex: 1, explanation: "Amaranth is well-adapted to local conditions, nutritious, and consistently in demand in markets." },
      { question: "What is the PRIMARY purpose of drainage holes in containers?", options: ["To make containers lighter", "To prevent waterlogging and root rot", "To allow pests to escape", "To reduce soil cost"], correctIndex: 1, explanation: "Excess water must drain to prevent roots from suffocating and developing rot diseases." },
      { question: "Which recycled container is BEST for growing potatoes vertically?", options: ["Plastic water bottles", "Stacked, cleaned tires", "Cardboard boxes", "Glass jars"], correctIndex: 1, explanation: "Stacked tires allow hilling (adding soil as plants grow) which is ideal for potato tuber development." },
      { question: "In the soil mix recipe, what is the role of rice husks or sand?", options: ["To add nutrients", "To improve drainage and prevent compaction", "To attract earthworms", "To change soil color"], correctIndex: 1, explanation: "Coarse materials create air pockets in container soil, ensuring roots get oxygen and water drains properly." },
      { question: "Why add wood ash to container soil?", options: ["To make soil darker", "To provide potassium and deter some pests", "To increase soil acidity", "To reduce container weight"], correctIndex: 1, explanation: "Wood ash is a source of potassium (important for fruiting) and can deter soft-bodied pests like aphids." },
      { question: "What is 'succession planting'?", options: ["Planting only once per season", "Sowing small batches every few weeks for continuous harvest", "Planting only root crops", "Using only heirloom seeds"], correctIndex: 1, explanation: "Succession planting ensures a steady supply of produce rather than one large harvest that may go to waste." },
      { question: "Which companion planting pair helps deter pests?", options: ["Tomatoes + Tomatoes", "Marigolds + Vegetables", "Lettuce + Lettuce", "Peppers + Eggplant"], correctIndex: 1, explanation: "Marigolds release compounds that deter nematodes and some insect pests, protecting neighboring vegetables." },
      { question: "Why start with only 3-5 containers as a beginner?", options: ["To save money on seeds only", "To learn management skills with lower risk before scaling", "Because urban spaces can't hold more", "To qualify for training programs"], correctIndex: 1, explanation: "Mastering watering, pest monitoring, and harvesting on a small scale builds confidence and reduces early losses." },
      { question: "Which crop is BEST for a beginner's first urban garden?", options: ["Avocado tree", "Amaranth or lettuce", "Coffee plant", "Timber tree"], correctIndex: 1, explanation: "Fast-growing, forgiving leafy greens provide quick success and learning opportunities with minimal investment." },
      { question: "What is a key advantage of fabric grow bags over plastic pots?", options: ["They are heavier", "They provide better root aeration and prevent circling roots", "They cost more money", "They require special soil"], correctIndex: 1, explanation: "Fabric allows air pruning of roots, promoting healthier root systems and better plant growth in containers." },
    ],
  },
  // ... [Continuing with modules 2,3,4 for Urban Farming]
]).returning();

// === AGROFORESTRY MODULES (5) ===
const agroPathway = pathways.find(p => p.title === "Agroforestry & Tree Nursery: Grow Trees, Grow Income")!;
const agroModules = await db.insert(learningModules).values([
  {
    pathwayId: agroPathway.id,
    orderIndex: 1,
    title: "Agroforestry Systems & Tree Selection",
    content: `# Agroforestry Systems & Tree Selection\n\n## What is Agroforestry?\n🌳 **Integrating trees with crops and/or livestock** on the same land:\n- **Not new**: Traditional Cameroonian farms often include fruit trees\n- **Science-backed**: Proven to increase resilience, productivity, and income\n- **Triple win**: Environmental benefits + farm productivity + diversified income\n\n## Types of Agroforestry for Cameroon\n\n### 🌾 Alley Cropping\n**What**: Rows of trees/shrubs with crops grown in between\n**Best for**: Maize, beans, vegetables on gentle slopes\n**Tree examples**:\n- **Gliricidia sepium**: Nitrogen-fixing, pruned for green manure\n- **Leucaena**: Fast-growing, provides fodder and fuelwood\n- **Fruit trees** (mango, avocado): Wider spacing for light-loving crops\n\n### 🐄 Silvopasture\n**What**: Trees integrated with livestock grazing\n**Best for**: Adamawa, North regions with cattle farming\n**Benefits**:\n- Shade reduces heat stress on animals\n- Trees provide fodder (leaves, pods)\n- Manure fertilizes trees\n\n### 🏡 Homegardens\n**What**: Diverse mix of trees, crops, herbs around homestead\n**Best for**: All regions, especially smallholder farms\n**Layers**:\n1. **Canopy**: Fruit/nut trees (mango, kola)\n2. **Understory**: Shade-tolerant crops (cocoyam, ginger)\n3. **Ground cover**: Herbs, vegetables, medicinal plants\n\n### 🌊 Boundary Planting\n**What**: Trees along field edges, waterways, roads\n**Benefits**:\n- Windbreaks protect crops\n- Roots stabilize soil, reduce erosion\n- Living fence reduces need for wire/poles\n\n## Choosing the Right Trees: Key Criteria\n\n### ✅ Ecological Fit\n| Factor | Questions to Ask |\n|--------|-----------------|\n| **Climate zone** | Does this tree thrive in your region's rainfall/temperature? |\n| **Soil type** | Does it tolerate your soil (acidic, clay, sandy)? |\n| **Water needs** | Is it drought-tolerant or does it need reliable moisture? |\n\n### ✅ Economic Value\n- **Short-term** (1-3 years): Fruit trees (papaya, citrus), fast-growing fuelwood\n- **Medium-term** (3-7 years): Timber ( Terminalia, Cedrela), high-value fruits (avocado)\n- **Long-term** (7+ years): High-value timber (Mahogany, Iroko), carbon credits potential\n\n### ✅ Social & Cultural Acceptance\n- **Local knowledge**: Which trees do farmers already value?\n- **Market demand**: Are there buyers for the products?\n- **Gender considerations**: Do women have access to benefits (e.g., fruit sales)?\n\n## Top Tree Recommendations for Cameroon\n\n### 🍎 Fruit Trees (Direct Income + Nutrition)\n| Tree | Time to First Harvest | Key Markets | Notes |\n|------|----------------------|-------------|-------|\n| **Papaya** | 8-12 months | Local markets, juice vendors | Fast, high-yield; plant multiple for pollination |\n| **Mango (local varieties)** | 3-5 years | Fresh fruit, processing | Choose grafted varieties for earlier fruiting |\n| **Avocado** | 3-4 years | Urban markets, export potential | High value; needs good drainage |\n| **Citrus (orange, lemon)** | 2-4 years | Fresh fruit, beverages | Susceptible to pests; choose resistant rootstocks |\n\n### 🌿 Nitrogen-Fixing Trees (Soil Improvement)\n| Tree | Primary Use | Growth Rate | Management Tip |\n|------|-------------|-------------|----------------|\n| **Gliricidia sepium** | Green manure, fodder | Fast (3-4m/year) | Prune regularly; leaves decompose quickly |\n| **Leucaena leucocephala** | Fodder, fuelwood, soil improvement | Fast | Contains mimosine (toxic in large amounts); rotate grazing |\n| **Sesbania sesban** | Green manure, stakes for yams | Very fast | Annual or short-lived perennial; easy to establish |\n\n### 🪵 Timber & Multipurpose Trees\n| Tree | Primary Products | Rotation | Special Considerations |\n|------|-----------------|----------|------------------------|\n| **Terminalia superba** (Afara) | Timber, poles | 15-20 years | Native; good for boundary planting |\n| **Cedrela odorata** (Spanish Cedar) | High-value timber, insect-repellent | 12-15 years | Fast-growing for a timber; market demand |\n| **Moringa oleifera** | Leaves (nutrition), seeds (oil), pods | Perennial, harvest leaves in months | Drought-tolerant; multiple uses; easy to propagate |\n\n## Getting Started: Simple Agroforestry Plan\n\n### Step 1: Assess Your Land\n- Map existing trees, crops, water sources\n- Identify problem areas (erosion, low fertility)\n- Note market access: What products can you sell nearby?\n\n### Step 2: Start Small & Strategic\n- Plant 5-10 high-value fruit trees near homestead\n- Establish a nursery bed for propagating your own seedlings\n- Integrate nitrogen-fixing trees in crop alleys\n\n### Step 3: Plan for Management\n- **Pruning schedule**: When to prune for fodder vs. fruit production\n- **Protection**: Tree guards against livestock, especially when young\n- **Watering**: Critical for first 1-2 dry seasons\n\n💡 *Agroforestry is a long-term investment—patience and consistent care yield compounding returns.*`,
    summary: "Designing agroforestry systems and selecting trees for ecological fit, economic return, and social acceptance",
    practicalTask: "Map your land (or a community plot). Identify 2-3 locations suitable for tree planting. Research local market prices for 3 potential tree products (fruit, timber, fodder).",
    durationMinutes: 12,
    contentType: "text",
    quizQuestions: [
      { question: "What is the PRIMARY benefit of alley cropping with nitrogen-fixing trees?", options: ["Making the farm look more organized", "Improving soil fertility naturally, reducing fertilizer needs", "Attracting more tourists", "Increasing pest problems"], correctIndex: 1, explanation: "Nitrogen-fixing trees convert atmospheric nitrogen into a form plants can use, enriching soil for adjacent crops." },
      { question: "Which agroforestry type integrates trees with livestock grazing?", options: ["Alley cropping", "Silvopasture", "Homegardens", "Boundary planting"], correctIndex: 1, explanation: "Silvopasture deliberately combines trees, forage plants, and livestock for mutual benefits like shade and fodder." },
      { question: "What is a key advantage of homegardens in urban/peri-urban areas?", options: ["They require no labor", "They provide diverse food, medicine, and income from a small space", "They only grow timber trees", "They replace the need for markets"], correctIndex: 1, explanation: "Homegardens maximize limited space with layered planting, yielding multiple products for household use and sale." },
      { question: "Which factor is LEAST important when selecting trees for agroforestry?", options: ["Climate zone suitability", "Tree color", "Soil type compatibility", "Market demand for products"], correctIndex: 1, explanation: "While aesthetics matter, ecological fit and economic viability are critical for successful, sustainable agroforestry." },
      { question: "How soon can papaya trees produce fruit?", options: ["1-2 months", "8-12 months", "3-5 years", "10+ years"], correctIndex: 1, explanation: "Papaya is fast-maturing, providing relatively quick returns compared to many fruit trees." },
      { question: "Why prune Gliricidia regularly in alley cropping?", options: ["To make it grow taller only", "To harvest leaves for green manure and control shade on crops", "To kill the tree", "To attract more birds"], correctIndex: 1, explanation: "Pruning provides nutrient-rich biomass for soil and prevents excessive shading of adjacent crops." },
      { question: "What is a management consideration for young trees in agroforestry?", options: ["Never water them", "Protect from livestock with tree guards", "Plant them only in the rainy season", "Harvest fruit immediately"], correctIndex: 1, explanation: "Young trees are vulnerable; physical protection and supplemental watering establish them successfully." },
      { question: "Which tree is noted for multiple uses: nutrition, oil, and drought tolerance?", options: ["Mango", "Moringa oleifera", "Mahogany", "Eucalyptus"], correctIndex: 1, explanation: "Moringa provides highly nutritious leaves, oil from seeds, and thrives in dry conditions, making it valuable for resilient farming." },
      { question: "What does 'rotation' mean for timber trees?", options: ["Planting in circles", "The number of years from planting to harvest", "Changing tree species every year", "Moving trees to new locations"], correctIndex: 1, explanation: "Rotation age is the planned harvest time, balancing growth rate, market size requirements, and land use planning." },
      { question: "Why start agroforestry with a small, strategic planting?", options: ["To use less water only", "To learn management practices and reduce risk before scaling", "Because large plantings are illegal", "To qualify for immediate payments"], correctIndex: 1, explanation: "Piloting allows adaptation to local conditions and builds skills for successful expansion." },
    ],
  },
  // ... [Continuing with modules 2-5 for Agroforestry]
]).returning();

// === WASTE COLLECTION BUSINESS MODULES (4) ===
const wastePathway = pathways.find(p => p.title === "Community Waste Collection: Build a Clean Business")!;
const wasteModules = await db.insert(learningModules).values([
  {
    pathwayId: wastePathway.id,
    orderIndex: 1,
    title: "Mapping Waste & Designing Collection Routes",
    content: `# Mapping Waste & Designing Collection Routes\n\n## The Opportunity in Urban Cameroon\n🗑️ Waste management gaps create business opportunities:\n- **Douala, Yaoundé**: Rapid urbanization outpaces municipal services\n- **Households & businesses**: Willing to pay for reliable, clean collection\n- **Recyclers**: Need sorted, clean materials (plastic, metal, paper)\n- **Environmental impact**: Reduce illegal dumping, flooding from clogged drains\n\n## Understanding Waste Streams\n\n### 📊 Typical Household Waste Composition (Cameroon Urban)\n| Waste Type | % of Total | Collection Value |\n|------------|------------|------------------|\n| **Organic** (food scraps, yard waste) | 50-60% | Low direct value; potential for composting |\n| **Plastics** (PET, HDPE, bags) | 15-25% | High value if sorted and clean |\n| **Paper/Cardboard** | 10-15% | Medium value; requires dry storage |\n| **Metals** (cans, foil) | 5-10% | High value per kg; easy to store |\n| **Glass, textiles, other** | 5-10% | Low-medium value; specialized buyers |\n\n### 💡 Key Insight: Value is in SORTING\n- Mixed waste: 20-50 XAF/kg to disposal site\n- Sorted PET plastic: 150-300 XAF/kg to recycler\n- Sorted aluminum cans: 200-400 XAF/kg\n\n## Step 1: Community Waste Assessment\n\n### 🗺️ Simple Mapping Exercise\n1. **Walk your target neighborhood** (start with 50-100 households)\n2. **Note**:\n   - Household density (houses per street block)\n   - Existing waste disposal points (legal/illegal)\n   - Obvious recyclable materials in waste piles\n   - Willingness to pay: Ask 10 households: "Would you pay 500-1,000 XAF/month for reliable collection?"\n\n3. **Sketch a simple map**:\n   - Mark collection points (central bins or household pickup)\n   - Identify access routes for carts/tricycles\n   - Note disposal/recycling facility locations\n\n### 📋 Sample Assessment Questions for Households\n- "What do you currently do with your waste?"\n- "What challenges do you face with waste disposal?"\n- "Would you prefer daily, twice-weekly, or weekly collection?"\n- "What price per month would be fair for reliable service?"\n\n## Step 2: Designing Efficient Collection Routes\n\n### 🚲 Transport Options by Scale\n| Scale | Vehicle | Capacity | Cost Range (XAF) |\n|-------|---------|----------|------------------|\n| **Micro** (1-2 people) | Wheelbarrow, pushcart | 50-100 kg | 10,000-30,000 (used) |\n| **Small** (2-3 people) | Bicycle with trailer, motorized tricycle | 200-400 kg | 50,000-150,000 |\n| **Medium** (3-5 people) | Small truck, converted pickup | 500-1000 kg | 500,000-2,000,000 |\n\n### 🔄 Route Design Principles\n✅ **Cluster households** by street/block to minimize travel time\n✅ **Start early** (5-7 AM) to avoid heat and traffic\n✅ **One-way loops** to avoid backtracking\n✅ **Place collection points** every 10-15 households for shared convenience\n✅ **Include sorting time** at central point before transport to disposal/recycler\n\n### 📅 Sample Weekly Schedule (100-household zone)\n| Day | Activity |\n|-----|----------|\n| **Mon, Thu** | Household collection (organic + recyclables) |\n| **Tue** | Sorting day: Separate plastics, metals, paper at central point |\n| **Wed** | Transport sorted recyclables to buyers; organic to compost site |\n| **Fri** | Collection + customer payments follow-up |\n| **Sat** | Maintenance, record-keeping, community engagement |\n\n## Step 3: Pricing Your Service\n\n### 💰 Cost-Plus Pricing Model\n\`\`\nMonthly Price per Household = (Operational Costs + Profit Margin) ÷ Number of Households\n\`\`\n\n**Example Calculation (Small Operation)**:\n- Labor (2 collectors @ 30,000 XAF/week): 240,000 XAF/month\n- Transport (tricycle fuel/maintenance): 40,000 XAF/month\n- Bags, gloves, tools: 20,000 XAF/month\n- **Total Costs**: 300,000 XAF/month\n- Target households: 100\n- Cost per household: 3,000 XAF\n- Add 30% profit margin: **3,900 XAF/household/month**\n\n✅ **Competitive Pricing Tips**:\n- Offer discounts for quarterly/annual prepayment\n- Tiered pricing: Basic (collection only) vs. Premium (collection + sorting + recycling credits)\n- Partner with landlords/businesses for bulk contracts\n\n## Safety & Community Relations\n\n### 👷 Essential Safety Practices\n- Wear gloves, closed shoes, high-visibility vest\n- Use tongs or tools to handle waste; never bare hands\n- Wash hands thoroughly after collection; keep soap/water in vehicle\n- Tetanus vaccination recommended for all staff\n\n### 🤝 Building Trust with the Community\n✅ **Be reliable**: Collect on schedule, rain or shine\n✅ **Be transparent**: Show where waste goes; share recycling income if possible\n✅ **Educate**: Simple flyers on "What goes in which bag"\n✅ **Listen**: Adjust service based on feedback (e.g., change collection time)\n\n💡 *Start with a pilot zone of 20-30 households to refine your system before expanding.*`,
    summary: "Practical steps to assess waste streams, design efficient routes, and price a community collection service",
    practicalTask: "Walk a 5-block area in your community. Note waste disposal practices, estimate household count, and sketch a simple collection route. Interview 3 households about willingness to pay for reliable service.",
    durationMinutes: 11,
    contentType: "text",
    quizQuestions: [
      { question: "What percentage of urban household waste in Cameroon is typically organic (food/yard waste)?", options: ["10-20%", "30-40%", "50-60%", "80-90%"], correctIndex: 2, explanation: "Organic waste makes up the majority (50-60%) of household waste, representing both a challenge and opportunity for composting." },
      { question: "Why is sorting waste CRITICAL for business value?", options: ["It makes bags look neater", "Sorted recyclables like PET plastic sell for 3-6x more than mixed waste", "It reduces collection time", "It's required by law everywhere"], correctIndex: 1, explanation: "Buyers pay premium prices for clean, sorted materials; mixed waste has minimal value and higher disposal costs." },
      { question: "What is the FIRST step in community waste assessment?", options: ["Buy a truck", "Walk the neighborhood to observe waste practices and talk to households", "Apply for a business license", "Build a compost site"], correctIndex: 1, explanation: "Understanding local context through direct observation and conversation ensures your service meets real needs." },
      { question: "Which transport option is MOST appropriate for starting with 1-2 people?", options: ["Large truck", "Bicycle with trailer or pushcart", "Helicopter", "Motorcycle only"], correctIndex: 1, explanation: "Low-cost, human-powered options minimize startup risk while allowing service validation." },
      { question: "In route design, why use 'one-way loops'?", options: ["To make routes longer", "To minimize backtracking and save time/fuel", "To avoid certain neighborhoods", "To increase vehicle wear"], correctIndex: 1, explanation: "Efficient routing reduces operational costs and allows more households to be served per trip." },
      { question: "What is a key component of the cost-plus pricing model?", options: ["Guessing what competitors charge", "Calculating operational costs first, then adding a profit margin", "Setting the highest price possible", "Charging the same as municipal services"], correctIndex: 1, explanation: "Understanding your true costs ensures sustainability; adding a reasonable margin allows for growth and resilience." },
      { question: "Why offer discounts for prepayment?", options: ["To lose money", "To improve cash flow and customer retention", "To discourage long-term commitment", "To complicate accounting"], correctIndex: 1, explanation: "Prepayment provides working capital and reduces collection effort, while rewarding customer loyalty." },
      { question: "Which safety practice is NON-NEGOTIABLE for waste collectors?", options: ["Wearing branded uniforms", "Using gloves and closed shoes to prevent injury/infection", "Collecting only during daylight", "Using expensive equipment"], correctIndex: 1, explanation: "Basic PPE protects against cuts, contaminants, and disease—essential for worker health and business continuity." },
      { question: "How does transparency build community trust?", options: ["By hiding where waste goes", "By showing where waste is taken and sharing benefits like recycling income", "By charging hidden fees", "By avoiding customer feedback"], correctIndex: 1, explanation: "Openness about operations and sharing value (e.g., from recyclables) fosters partnership and long-term customer relationships." },
      { question: "Why start with a PILOT zone of 20-30 households?", options: ["To maximize immediate profit", "To test and refine the system with lower risk before scaling", "Because larger zones are illegal", "To avoid hiring staff"], correctIndex: 1, explanation: "Piloting allows learning, adaptation, and proof of concept with manageable investment before expanding." },
    ],
  },
  // ... [Continuing with modules 2-4 for Waste Collection Business]
]).returning();

// === BIOGAS MODULES (5) ===
const biogasPathway = pathways.find(p => p.title === "Biogas Digesters: Turn Waste into Cooking Fuel")!;
const biogasModules = await db.insert(learningModules).values([
  {
    pathwayId: biogasPathway.id,
    orderIndex: 1,
    title: "Biogas Science & Safety Fundamentals",
    content: `# Biogas Science & Safety Fundamentals\n\n## What is Biogas?\n🔥 **Biogas is a renewable fuel produced when microorganisms break down organic matter WITHOUT oxygen** (anaerobic digestion):\n- **Main component**: Methane (CH₄, 50-75%) – burns cleanly for cooking\n- **Byproducts**: Carbon dioxide (CO₂), trace gases, and nutrient-rich digestate (liquid fertilizer)\n- **Feedstocks**: Animal manure (cow, pig, poultry), food waste, crop residues\n\n## Why Biogas Matters for Cameroon\n✅ **Energy Security**: Replace firewood/charcoal with on-farm gas\n✅ **Health**: Reduce indoor smoke from traditional stoves (respiratory illnesses)\n✅ **Environment**: Capture methane (potent GHG) that would otherwise escape from manure\n✅ **Agriculture**: Digestate is a superior organic fertilizer vs. raw manure\n\n## The Anaerobic Digestion Process: 4 Stages\n\n### Stage 1: Hydrolysis\n- Complex organics (carbs, proteins, fats) broken into simple sugars, amino acids\n- **Key microbes**: Hydrolytic bacteria\n- **Cameroon tip**: Chop feedstocks small to speed up this stage\n\n### Stage 2: Acidogenesis\n- Simple compounds converted to volatile fatty acids, alcohols, H₂, CO₂\n- **Key microbes**: Acidogenic bacteria\n- **Note**: pH drops; system needs buffering capacity\n\n### Stage 3: Acetogenesis\n- Fatty acids converted to acetic acid, H₂, CO₂\n- **Key microbes**: Acetogenic bacteria\n- **Critical**: This stage prepares substrates for methane production\n\n### Stage 4: Methanogenesis\n- Acetic acid, H₂, CO₂ converted to methane (CH₄) and CO₂\n- **Key microbes**: Methanogens (strict anaerobes, sensitive to oxygen/pH)\n- **Optimal conditions**: pH 6.8-7.5, temperature 25-40°C (mesophilic)\n\n## Safety First: Non-Negotiable Practices\n\n### ⚠️ Biogas System Hazards & Mitigation\n| Hazard | Risk | Mitigation |\n|--------|------|------------|\n| **Methane explosion** | Gas + air + spark = explosion | - Install flame arrestors on gas lines<br>- Never smoke near digester<br>- Ventilate enclosed spaces |\n| **Hydrogen sulfide (H₂S)** | Toxic gas (rotten egg smell); corrosive | - Add iron filings to feedstock to precipitate sulfur<br>- Use H₂S scrubbers (iron wool) in gas line<br>- Test gas with lead acetate paper if possible |\n| **Pathogens in feedstock** | Disease transmission from manure | - Ensure adequate retention time (30-50 days) for pathogen reduction<br>- Use digestate only on non-food crops initially, or compost further |\n| **Structural failure** | Digester collapse, gas leaks | - Follow proven designs; use quality materials<br>- Regular inspection for cracks, leaks<br>- Pressure test before first use |\n\n### 👷 Personal Protective Equipment (PPE)\n- Gloves and boots when handling feedstock/digestate\n- Eye protection when mixing or inspecting\n- Respirator if working in confined spaces with potential H₂S\n\n## Feedstock Selection & Preparation\n\n### ✅ Ideal Feedstocks for Small-Scale Digesters\n| Feedstock | Biogas Yield (m³/kg VS*) | Notes for Cameroon |\n|-----------|--------------------------|-------------------|\n| **Cow manure** | 0.20-0.30 | Widely available; mix with water 1:1 |\n| **Pig manure** | 0.30-0.50 | Higher yield; ensure no antibiotics/residues |\n| **Poultry manure** | 0.30-0.45 | High nitrogen; dilute well to avoid ammonia toxicity |\n| **Food waste** | 0.40-0.60 | High yield but variable; pre-compost to stabilize |\n| **Crop residues** (maize stover, etc.) | 0.20-0.40 | Chop finely; may need co-digestion with manure for microbes |\n\n*VS = Volatile Solids (organic matter)\n\n### 🔄 Feedstock Preparation Steps\n1. **Remove contaminants**: Stones, plastic, metal\n2. **Chop/shred**: Particles <2 cm for faster digestion\n3. **Mix with water**: Slurry consistency like thin porridge (8-12% total solids)\n4. **Pre-acclimatize** (optional): Let fresh manure sit 1-2 days to reduce oxygen\n\n## Sizing Your First Digester: Simple Rule of Thumb\n\n### 📏 For Household Cooking Needs\n\`\`\nDigester Volume (m³) = Daily Feedstock (kg) × Retention Time (days) ÷ Slurry Density (kg/m³)\n\`\`\n\n**Practical Example**:\n- Family of 5 needs ~1.5 m³ biogas/day for cooking\n- Using cow manure: ~15 kg fresh manure/day (mixed 1:1 with water = 30 kg slurry)\n- Retention time: 40 days (mesophilic)\n- Slurry density: ~1000 kg/m³ (like water)\n- Calculation: 30 kg/day × 40 days ÷ 1000 kg/m³ = **1.2 m³ digester volume**\n\n✅ **Recommendation**: Start with a 2-3 m³ fixed-dome digester for a small household – allows buffer for variable feedstock.\n\n💡 *Biogas is a long-term investment: A well-built digester can operate 15-20 years with proper maintenance.*`,
    summary: "Core science of anaerobic digestion, critical safety protocols, and feedstock management for biogas production",
    practicalTask: "Identify potential feedstock sources near you (livestock farms, markets). Calculate approximate daily manure availability. Sketch a simple digester location considering sun exposure, proximity to kitchen, and safety setbacks.",
    durationMinutes: 13,
    contentType: "text",
    quizQuestions: [
      { question: "What is the PRIMARY combustible component of biogas?", options: ["Carbon dioxide", "Methane", "Hydrogen sulfide", "Nitrogen"], correctIndex: 1, explanation: "Methane (CH₄) is the fuel component that burns cleanly for cooking; CO₂ is non-combustible and dilutes the gas." },
      { question: "Which stage of anaerobic digestion PRODUCES methane?", options: ["Hydrolysis", "Acidogenesis", "Acetogenesis", "Methanogenesis"], correctIndex: 3, explanation: "Methanogenic archaea convert acetic acid, H₂, and CO₂ into methane in the final stage." },
      { question: "What is the OPTIMAL pH range for methanogens?", options: ["4.0-5.0", "5.5-6.5", "6.8-7.5", "8.0-9.0"], correctIndex: 2, explanation: "Methanogens are sensitive to pH; outside 6.8-7.5, their activity drops sharply, reducing gas production." },
      { question: "Why is hydrogen sulfide (H₂S) a concern in biogas systems?", options: ["It makes gas burn brighter", "It is toxic, corrosive, and has a rotten egg smell", "It increases methane content", "It is a valuable fertilizer"], correctIndex: 1, explanation: "H₂S poses health risks to humans and can corrode engines/pipes; removal is essential for safe use." },
      { question: "Which feedstock typically has the HIGHEST biogas yield per kg?", options: ["Cow manure", "Pig manure", "Food waste", "Sawdust"], correctIndex: 2, explanation: "Food waste is rich in easily degradable organics, yielding more biogas than manures or lignin-rich residues." },
      { question: "Why chop feedstocks to <2 cm particles?", options: ["To make them look uniform", "To increase surface area for faster microbial breakdown", "To reduce water needs", "To prevent gas production"], correctIndex: 1, explanation: "Smaller particles allow microbes to access and digest organic matter more quickly, improving gas yield and rate." },
      { question: "What is the purpose of mixing manure with water to form slurry?", options: ["To make it heavier", "To achieve optimal solids concentration (8-12%) for microbial activity and flow", "To reduce methane content", "To kill pathogens immediately"], correctIndex: 1, explanation: "Proper slurry consistency ensures good mixing, prevents scum formation, and maintains ideal conditions for digestion." },
      { question: "In the sizing example, why choose a 2-3 m³ digester when calculation suggested 1.2 m³?", options: ["To waste materials", "To provide buffer capacity for variable feedstock and future expansion", "Because larger digesters are always better", "To increase construction cost"], correctIndex: 1, explanation: "Oversizing slightly accommodates fluctuations in feedstock availability and allows for adding more input later." },
      { question: "Which safety practice prevents methane explosions?", options: ["Storing gas in open containers", "Installing flame arrestors and avoiding sparks near gas lines", "Using plastic pipes only", "Venting gas indoors"], correctIndex: 1, explanation: "Flame arrestors stop flames from traveling back into the digester; eliminating ignition sources prevents explosions." },
      { question: "Why ensure adequate retention time (e.g., 30-50 days) in the digester?", options: ["To make the digester larger", "To allow complete digestion and pathogen reduction", "To increase gas pressure", "To reduce water usage"], correctIndex: 1, explanation: "Sufficient time ensures organics are fully converted to gas and pathogens are reduced, making digestate safer for use." },
    ],
  },
  // ... [Continuing with modules 2-5 for Biogas]
]).returning();

// === SOLAR INSTALLATION MODULES (6) ===
const solarPathway = pathways.find(p => p.title === "Solar Power Technician: Install & Maintain Small Systems")!;
const solarModules = await db.insert(learningModules).values([
  {
    pathwayId: solarPathway.id,
    orderIndex: 1,
    title: "Solar Energy Basics & System Sizing",
    content: `# Solar Energy Basics & System Sizing\n\n## Why Solar in Cameroon?\n☀️ Abundant sunshine + unreliable grid = opportunity:\n- **Solar potential**: 4-6 kWh/m²/day across most of Cameroon\n- **Demand**: Homes, shops, schools, clinics need reliable power\n- **Cost trend**: Solar panel prices dropped >80% in last decade\n- **Skills gap**: Few trained technicians = high earning potential\n\n## How Solar PV Systems Work: Simple Overview\n\n### 🔋 Core Components\n| Component | Function | Key Specification |\n|-----------|----------|-------------------|\n| **Solar Panel** | Converts sunlight to DC electricity | Watt-peak (Wp), voltage (Vmp) |\n| **Charge Controller** | Regulates battery charging; prevents overcharge | PWM or MPPT type; current rating (A) |\n| **Battery** | Stores energy for use when sun isn't shining | Capacity (Ah), voltage (12V/24V), depth of discharge |\n| **Inverter** | Converts DC battery power to AC for appliances | Power rating (W), waveform (pure sine vs. modified) |\n| **Wiring & Protection** | Connects components safely; includes fuses/breakers | Wire gauge, voltage rating, IP protection |\n\n### ⚡ Energy Flow Diagram\n\`\`\nSunlight → Solar Panel (DC) → Charge Controller → Battery (Storage)\n                              ↓\n                      Inverter (DC→AC) → AC Appliances\n                              ↓\n                   DC Appliances (lights, phone chargers)\n\`\`\n\n## Step 1: Calculate Customer Energy Needs\n\n### 📋 Load Assessment Worksheet\n**Ask the customer**: "Which appliances do you want to power, and for how many hours per day?"\n\n| Appliance | Power (Watts) | Hours/Day | Daily Energy (Wh) |\n|-----------|---------------|-----------|-------------------|\n| LED Light (x3) | 10W each | 4 hours | 3 × 10 × 4 = 120 Wh |\n| Phone Charging (x2) | 5W each | 2 hours | 2 × 5 × 2 = 20 Wh |\n| Laptop | 50W | 3 hours | 50 × 3 = 150 Wh |\n| Small TV (32") | 40W | 3 hours | 40 × 3 = 120 Wh |\n| **TOTAL** | | | **410 Wh/day** |\n\n✅ **Add 20% buffer** for inefficiencies: 410 × 1.2 = **~500 Wh/day needed**\n\n## Step 2: Size the Solar Panel Array\n\n### ☀️ Panel Sizing Formula\n\`\`\nPanel Wattage (Wp) = Daily Energy Need (Wh) ÷ Peak Sun Hours ÷ System Efficiency\n\`\`\n\n**Example for Douala **(average 4.5 peak sun hours/day)\n- Daily need: 500 Wh\n- Peak sun hours: 4.5 h\n- System efficiency factor: 0.75 (accounts for losses in wiring, controller, battery)\n- Calculation: 500 Wh ÷ 4.5 h ÷ 0.75 = **148 Wp**\n\n✅ **Recommendation**: Use a 150W or 200W panel for flexibility and cloudy days\n\n## Step 3: Size the Battery Bank\n\n### 🔋 Battery Capacity Formula\n\`\`\nBattery Capacity (Ah) = Daily Energy Need (Wh) × Days of Autonomy ÷ (System Voltage × Depth of Discharge)\n\`\`\n\n**Example **(12V system, 2 days autonomy, 50% DoD for lead-acid)\n- Daily need: 500 Wh\n- Days of autonomy: 2 (for cloudy periods)\n- System voltage: 12V\n- Depth of Discharge (DoD): 0.5 (never drain lead-acid below 50%)\n- Calculation: (500 Wh × 2) ÷ (12V × 0.5) = **167 Ah**\n\n✅ **Recommendation**: Use a 200Ah deep-cycle battery (or two 100Ah in parallel)\n\n## Step 4: Select Charge Controller & Inverter\n\n### ⚙️ Charge Controller Sizing\n\`\`\nController Current (A) = Panel Wattage (Wp) ÷ System Voltage (V) × Safety Factor\n\`\`\n- Example: 200W panel ÷ 12V × 1.25 safety factor = **20.8A** → Choose **30A controller**\n\n✅ **PWM vs. MPPT**:\n- **PWM**: Lower cost; good for small systems where panel voltage matches battery\n- **MPPT**: 10-30% more energy harvest; better for larger systems or mismatched voltages\n\n### 🔌 Inverter Sizing\n- **Continuous power**: Sum of appliance watts running simultaneously\n- **Surge power**: Account for motor startup (fridge, pump: 3-5x running wattage)\n- Example: Laptop (50W) + TV (40W) + lights (30W) = 120W continuous → Choose **300W pure sine inverter** for headroom and motor loads\n\n## Cameroon-Specific Considerations\n\n### 🌦️ Weather & Installation\n- **Dust/harmattan**: Clean panels monthly; tilt angle 5-10° for self-cleaning rain\n- **Humidity**: Use IP65-rated components for outdoor boxes\n- **Security**: Mount panels on roofs or locked frames; use anti-theft bolts\n\n### 💰 Cost Estimates (2024, Cameroon Market)\n| Component | Approx. Cost (XAF) |\n|-----------|-------------------|\n| 200W Solar Panel | 40,000 - 70,000 |\n| 200Ah Deep-Cycle Battery | 80,000 - 150,000 |\n| 30A MPPT Controller | 25,000 - 45,000 |\n| 500W Pure Sine Inverter | 35,000 - 65,000 |\n| Wiring, mounts, protection | 15,000 - 30,000 |\n| **Total System **(200W) | **195,000 - 360,000** |\n\n✅ **Pricing your service**: Add 20-40% for labor, design, warranty, and profit\n\n💡 *Start with small systems (50-200W) to build confidence before scaling to larger installations.*`,
    summary: "Fundamentals of solar PV components, load calculation, and sizing systems for Cameroonian conditions",
    practicalTask: "Interview a potential customer (family, neighbor). List their appliance needs and calculate daily energy use. Size a basic 12V system using the formulas provided.",
    durationMinutes: 12,
    contentType: "text",
    quizQuestions: [
      { question: "What is the average daily solar irradiance in most of Cameroon?", options: ["1-2 kWh/m²/day", "2-3 kWh/m²/day", "4-6 kWh/m²/day", "8-10 kWh/m²/day"], correctIndex: 2, explanation: "Cameroon's location near the equator provides strong, consistent sunshine ideal for solar power generation." },
      { question: "Which component PREVENTS battery overcharging?", options: ["Inverter", "Solar panel", "Charge controller", "Fuse"], correctIndex: 2, explanation: "The charge controller regulates voltage/current from panels to safely charge batteries and extend their lifespan." },
      { question: "In the load assessment example, what was the TOTAL daily energy need BEFORE adding buffer?", options: ["200 Wh", "410 Wh", "500 Wh", "1000 Wh"], correctIndex: 1, explanation: "Summing the energy use of all listed appliances gave 410 Wh/day before applying the 20% inefficiency buffer." },
      { question: "Why add a 20% buffer to calculated energy needs?", options: ["To make the system more expensive", "To account for wiring losses, battery inefficiency, and cloudy days", "To reduce panel size", "To comply with regulations"], correctIndex: 1, explanation: "Real-world systems have losses; the buffer ensures reliable performance under less-than-ideal conditions." },
      { question: "What does 'Wp' stand for in solar panel specifications?", options: ["Watts per hour", "Watt-peak (power under standard test conditions)", "Waterproof rating", "Weight of panel"], correctIndex: 1, explanation: "Watt-peak is the panel's rated power output under ideal laboratory conditions (1000W/m² irradiance, 25°C)." },
      { question: "In the battery sizing example, why use 50% Depth of Discharge (DoD) for lead-acid?", options: ["To make batteries last longer by avoiding deep discharges", "To increase system voltage", "To reduce panel requirements", "To comply with Cameroonian law"], correctIndex: 0, explanation: "Deep discharges significantly shorten lead-acid battery life; limiting to 50% DoD extends cycle life 2-3x." },
      { question: "What is the key advantage of an MPPT charge controller over PWM?", options: ["Lower cost", "10-30% more energy harvest, especially in cool/cloudy conditions", "Simpler wiring", "No need for batteries"], correctIndex: 1, explanation: "MPPT controllers track the panel's maximum power point, converting excess voltage to current for more efficient charging." },
      { question: "Why choose a PURE SINE WAVE inverter for sensitive electronics?", options: ["It costs less", "It provides clean power like the grid, safe for laptops, TVs, and motors", "It weighs less", "It works without batteries"], correctIndex: 1, explanation: "Modified sine inverters can cause noise, overheating, or damage to sensitive devices; pure sine is grid-quality power." },
      { question: "What installation practice helps panels self-clean during rain in dusty seasons?", options: ["Mounting flat on roof", "Tilting panels 5-10° to allow rain runoff", "Covering panels with plastic", "Cleaning only once a year"], correctIndex: 1, explanation: "A slight tilt enables rain to wash away dust, maintaining panel efficiency with minimal manual cleaning." },
      { question: "Why start with small systems (50-200W) as a new technician?", options: ["Because large systems are illegal", "To build skills, confidence, and reputation with lower financial risk", "Because customers only want small systems", "To avoid learning about batteries"], correctIndex: 1, explanation: "Mastering fundamentals on manageable projects reduces errors and builds customer trust for larger future work." },
    ],
  },
  // ... [Continuing with modules 2-6 for Solar Installation]
]).returning();

// === BIOMASS BRIQUETTES MODULES (4) ===
const briquettePathway = pathways.find(p => p.title === "Biomass Briquettes: Clean Fuel from Farm Waste")!;
const briquetteModules = await db.insert(learningModules).values([
  {
    pathwayId: briquettePathway.id,
    orderIndex: 1,
    title: "Feedstock Selection & Preparation",
    content: `# Feedstock Selection & Preparation\n\n## Why Biomass Briquettes?\n🔥 Turning waste into wealth:\n- **Problem**: Charcoal demand drives deforestation; agricultural residues often burned or wasted\n- **Solution**: Compress crop residues into dense, clean-burning briquettes\n- **Benefits**: Higher energy density than raw biomass, consistent burn, lower smoke than traditional fuels\n\n## Ideal Feedstocks in Cameroon\n\n### ✅ High-Potential Agricultural Residues\n| Feedstock | Availability | Key Characteristics | Preparation Tips |\n|-----------|--------------|---------------------|------------------|\n| **Sawdust** (carpentry workshops) | High in urban/peri-urban areas | Fine particle size; binds well with starch | Dry to <15% moisture; sieve to remove large pieces |\n| **Rice Husks** (mills in North, Far North) | Seasonal but abundant | High silica content; requires binder | Mix with clay or cassava starch binder (10-20%) |\n| **Corn Cobs** (nationwide post-harvest) | Seasonal (mainly Oct-Jan) | Moderate density; easy to collect | Crush to <1cm pieces; dry thoroughly |\n| **Coconut Shells** (Littoral, Southwest) | Year-round in coastal areas | Very high energy density; hard to crush | Use hammer mill or manual crusher; blend with softer biomass |\n| **Groundnut Shells** (North regions) | Seasonal | Good binder properties; moderate energy | Dry and crush; can be used alone or blended |\n\n### ⚠️ Feedstocks to AVOID\n- **Treated wood** (paint, preservatives): Releases toxic fumes when burned\n- **Plastic-contaminated waste**: Melts, clogs presses, emits hazardous smoke\n- **High-moisture materials** (>20%): Won't compress well; mold risk in storage\n- **Invasive weeds** (e.g., water hyacinth): May spread seeds if not fully carbonized\n\n## Feedstock Preparation: Step-by-Step\n\n### Step 1: Collection & Sorting\n- Partner with sawmills, rice mills, markets for consistent supply\n- Sort out contaminants: stones, metal, plastic, large debris\n- Store under cover to prevent re-wetting\n\n### Step 2: Size Reduction\n**Goal**: Particles <1cm for uniform compression\n\n| Tool | Best For | Cost Range (XAF) |\n|------|----------|------------------|\n| **Manual hammer mill** | Small-scale; corn cobs, shells | 20,000 - 50,000 (local fabrication) |\n| **Motorized chipper/shredder** | Medium-scale; sawdust, husks | 150,000 - 400,000 |\n| **Mortar & pestle** | Very small batches; testing | <5,000 |\n\n✅ **Tip**: Pre-dry materials before crushing to reduce energy use and improve particle quality\n\n### Step 3: Drying\n**Target moisture content**: 10-15% for optimal binding and combustion\n\n### ☀️ Low-Cost Drying Methods\n| Method | Setup | Time Required |\n|--------|-------|---------------|\n| **Sun drying on tarps** | Spread 2-3cm thick on black tarps; turn twice daily | 2-4 days (dry season) |\n| **Raised mesh racks** | Elevate material for airflow underneath; cover with clear plastic at night | 1-3 days |\n| **Simple solar dryer** | Box with clear plastic top, black interior, ventilation holes | 1-2 days; works in partial sun |\n\n✅ **Moisture test **(no meter)\n- Squeeze a handful: Should feel dry, not cool/damp\n- Crumble test: Should break easily, not bend or clump\n\n### Step 4: Binder Selection & Mixing\n**Why binders**? Some residues (rice husks, sawdust) need adhesive to hold shape\n\n### 🌾 Natural Binder Options (Cameroon)\n| Binder | Ratio | Preparation | Pros/Cons |\n|--------|-------|-------------|-----------|\n| **Cassava starch** | 10-15% of dry biomass | Mix starch with hot water to form paste; cool before mixing | ✅ Strong bond, food-safe<br>❌ Cost if not home-produced |\n| **Clay **(termite mound) | 15-25% | Sift fine clay; mix with water to slurry | ✅ Very low cost, widely available<br>❌ Adds ash content; may reduce heat value |\n| **Molasses** (sugar mills) | 5-10% | Dilute with water; mix thoroughly | ✅ Good binder, adds slight sweetness to smoke<br>❌ Can attract insects if not fully carbonized |\n| **Paper pulp** (recycled) | 20-30% | Soak waste paper; blend into slurry | ✅ Uses waste, good binder<br>❌ Requires extra drying time |\n\n### 🔄 Mixing Process\n1. Weigh dry biomass and binder materials\n2. Mix dry ingredients first for even distribution\n3. Gradually add water while mixing to achieve "damp sand" consistency\n4. Let mixture rest 15-30 minutes for binder hydration\n5. Test compression: Should hold shape when squeezed firmly\n\n💡 *Start with small batches (5-10 kg) to perfect your feedstock-binder ratio before scaling.*`,
    summary: "Selecting, preparing, and conditioning agricultural residues for high-quality briquette production",
    practicalTask: "Identify 2-3 potential feedstock sources near you. Collect small samples, dry them, and test binding with cassava starch or clay. Make 5 test briquettes by hand to assess formability.",
    durationMinutes: 11,
    contentType: "text",
    quizQuestions: [
      { question: "What is the TARGET moisture content for biomass before briquetting?", options: ["5-8%", "10-15%", "20-25%", "30%+"], correctIndex: 1, explanation: "10-15% moisture allows proper binding during compression while ensuring good combustion; too wet causes molding, too dry reduces binding." },
      { question: "Which feedstock is noted for HIGH energy density but requires crushing?", options: ["Sawdust", "Rice husks", "Coconut shells", "Corn cobs"], correctIndex: 2, explanation: "Coconut shells have high calorific value but are very hard, requiring mechanical crushing before use." },
      { question: "Why AVOID treated wood in briquette production?", options: ["It's too expensive", "It releases toxic fumes when burned", "It doesn't compress well", "It attracts more pests"], correctIndex: 1, explanation: "Chemical preservatives, paints, or glues in treated wood can emit hazardous compounds during combustion, posing health risks." },
      { question: "What particle size is IDEAL for briquetting?", options: [">5 cm", "2-5 cm", "<1 cm", "Any size works"], correctIndex: 2, explanation: "Small, uniform particles compress more densely and consistently, producing stronger, longer-burning briquettes." },
      { question: "Which natural binder is WIDELY AVAILABLE and LOW-COST in Cameroon?", options: ["Synthetic glue", "Cassava starch", "Clay from termite mounds", "Imported resin"], correctIndex: 2, explanation: "Termite mound clay is abundant, free, and effective as a binder, though it adds ash content to the final briquette." },
      { question: "What is the purpose of letting the biomass-binder mixture REST before pressing?", options: ["To cool it down", "To allow binder hydration for better binding", "To reduce weight", "To change color"], correctIndex: 1, explanation: "Resting allows water to fully penetrate particles and binders to activate, improving compression and briquette integrity." },
      { question: "Which simple test checks if biomass is dry enough?", options: ["Weigh it", "Squeeze a handful: should feel dry and crumble easily", "Smell it", "Listen to it"], correctIndex: 1, explanation: "The hand-feel test is a practical field method: properly dried biomass feels dry, not cool/damp, and crumbles rather than bending." },
      { question: "Why partner with sawmills or rice mills for feedstock?", options: ["To get free labor", "To secure consistent, large-volume supply of residues", "To avoid transportation", "To reduce product quality"], correctIndex: 1, explanation: "Industrial processors generate predictable waste streams, enabling reliable feedstock planning and economies of scale." },
      { question: "What is a key advantage of sun-drying on BLACK tarps?", options: ["They look professional", "Black color absorbs more heat, speeding up drying", "They are waterproof only", "They prevent all dust contamination"], correctIndex: 1, explanation: "Dark surfaces absorb solar radiation more effectively, raising material temperature and accelerating moisture evaporation." },
      { question: "Why start with SMALL test batches (5-10 kg)?", options: ["To waste less material if the recipe needs adjustment", "Because large batches are illegal", "To avoid hiring workers", "To reduce product value"], correctIndex: 0, explanation: "Small-scale testing allows rapid iteration of feedstock ratios, moisture levels, and binder amounts with minimal cost and risk." },
    ],
  },
  // ... [Continuing with modules 2-4 for Biomass Briquettes]
]).returning();

// === RAINWATER HARVESTING MODULES (4) ===
const rainPathway = pathways.find(p => p.title === "Rainwater Harvesting: Secure Water for Homes & Farms")!;
const rainModules = await db.insert(learningModules).values([
  {
    pathwayId: rainPathway.id,
    orderIndex: 1,
    title: "Catchment Calculation & System Design",
    content: `# Catchment Calculation & System Design\n\n## Why Rainwater Harvesting in Cameroon?\n💧 Water security is critical:\n- **Dry seasons**: 3-5 months with little/no rain in many regions\n- **Urban areas**: Water vendors charge 500-2,000 XAF/20L jerrycan\n- **Rural areas**: Women/girls spend hours daily fetching water\n- **Climate change**: More intense rains followed by longer dry spells\n\n## Step 1: Calculate Your Rainwater Potential\n\n### 📐 Roof Catchment Area Formula\n\`\`\nCatchment Area (m²) = Roof Length (m) × Roof Width (m) × Runoff Coefficient\n\`\`\n\n**Runoff Coefficients by Roof Type**:\n| Roof Material | Coefficient | Notes |\n|---------------|-------------|---------|\n| **Corrugated iron** | 0.85-0.90 | Smooth, non-absorbent; best for harvesting |\n| **Clay tiles** | 0.70-0.80 | Some absorption; ensure good slope |\n| **Thatch** | 0.40-0.60 | High absorption; not ideal without treatment |\n| **Concrete** | 0.75-0.85 | Good if sealed; watch for cracks |\n\n**Example **(Douala household)\n- Roof: 8m × 6m corrugated iron\n- Area: 48 m²\n- Coefficient: 0.85\n- Effective catchment: 48 × 0.85 = **40.8 m²**\n\n### 🌧️ Annual Rainfall & Harvest Potential\n\`\`\nHarvest Potential (L/year) = Catchment Area (m²) × Annual Rainfall (mm) × 0.8 (system efficiency)\n\`\`\n\n**Cameroon Rainfall Averages**:\n| Region | Annual Rainfall (mm) |\n|--------|---------------------|\n| **Far North** | 600-900 |\n| **North/Adamawa** | 900-1,200 |\n| **West/Highlands** | 1,500-2,500 |\n| **Littoral/South** | 2,000-4,000 |\n\n**Example **(Douala: ~3,000 mm/year)\n- 40.8 m² × 3,000 mm × 0.8 = **97,920 liters/year**\n- Monthly average: ~8,160 L (but highly seasonal!)\n\n✅ **Key Insight**: Focus on storing wet-season surplus for dry-season use\n\n## Step 2: Size Your Storage Tank\n\n### 📊 Storage Sizing Approach\n**Option A: Dry-Season Coverage**\n\`\`\nTank Volume (L) = Daily Household Need (L) × Dry Season Length (days)\n\`\`\n- Example: Family of 5 needs 50 L/person/day = 250 L/day\n- Dry season: 120 days (4 months)\n- Tank needed: 250 × 120 = **30,000 L **(30 m³)\n\n**Option B: Budget-Conscious Starter**\n- Start with 1,000-5,000 L tank for critical uses (drinking, cooking)\n- Supplement with smaller containers for washing, cleaning\n- Expand storage as budget allows\n\n### 🪣 Tank Options & Costs (Cameroon)\n| Tank Type | Capacity Range | Cost (XAF) | Pros/Cons |\n|-----------|---------------|------------|-----------|\n| **Plastic **(polyethylene) | 500-10,000 L | 50,000-500,000 | ✅ Lightweight, easy install<br>❌ UV degradation if not protected |\n| **Ferro-cement** | 2,000-20,000 L | 150,000-1,000,000 | ✅ Durable, customizable<br>❌ Requires skilled labor |\n| **Repurposed containers** (water trucks, IBC totes) | 1,000-5,000 L | 30,000-150,000 | ✅ Low cost, immediate availability<br>❌ May need cleaning/modification |\n| **Underground masonry** | 5,000-50,000 L | 300,000-2,000,000 | ✅ Cool, protected from evaporation<br>❌ Higher construction cost |\n\n## Step 3: Essential System Components\n\n### 🏠 Gutters & Downpipes\n- **Material**: PVC, galvanized steel, or bamboo (treated)\n- **Slope**: 1:100 (1 cm drop per meter) for self-cleaning flow\n- **Size**: 100mm diameter minimum for tropical downpours\n- **Cameroon tip**: Add mesh guards to prevent leaves/debris clogging\n\n### 🚰 First-Flush Diverter (CRITICAL for Water Quality)\n**Why**? The first rain washes dust, bird droppings, and pollutants off the roof\n\n**Simple DIY Design**:\n1. Install a T-junction in the downpipe\n2. Attach a vertical pipe (1-2m long) with a cap at bottom\n3. First rain fills this pipe; clean water overflows to tank\n4. After storm, empty the diverter pipe manually or via small drain\n\n✅ **Rule of thumb**: Divert first 20-50 L per 10 m² of roof\n\n### 🔍 Filtration for Non-Potable Use\n**For gardening, washing, cleaning**:\n- **Mesh filter** (1mm) at tank inlet: Removes leaves, large debris\n- **Sand-gravel filter** (optional): Layer of gravel (5cm) + sand (15cm) in a bucket\n\n**For drinking water **(requires additional treatment)\n- Rainwater is generally clean but NOT automatically potable\n- Always treat before drinking: boiling, chlorination, or ceramic filter\n\n## Step 4: System Layout & Installation Tips\n\n### 🗺️ Optimal Tank Placement\n✅ **Elevate tank** 1-2m on platform for gravity pressure to taps\n✅ **Place near point of use** to minimize pipe runs\n✅ **Ensure stable, level foundation** (compacted soil + concrete slab)\n✅ **Shade tank** with roof or vegetation to reduce algae growth\n\n### 🔧 Basic Installation Sequence\n1. Prepare foundation: Level, compacted, with drainage away from tank\n2. Install tank (or build ferro-cement)\n3. Mount gutters with proper slope; seal joints with silicone\n4. Install first-flush diverter before tank inlet\n5. Add overflow pipe directed away from foundation\n6. Install tap at tank base with shut-off valve\n7. Test with water before first rain\n\n### 🌧️ Maintenance Schedule\n| Task | Frequency |\n|------|-----------|\n| Clean gutters & mesh guards | Before rainy season; after heavy storms |\n| Empty first-flush diverter | After each significant rain |\n| Inspect tank for cracks/leaks | Quarterly |\n| Clean tank interior | Annually (dry season) |\n| Check taps, pipes for leaks | Monthly |\n\n💡 *Start small: A 1,000L tank with good gutters can provide significant dry-season relief.*`,
    summary: "Calculating rainwater potential, sizing storage, and designing safe, efficient harvest systems for Cameroon",
    practicalTask: "Measure your roof (or a community building). Calculate catchment area and potential harvest using local rainfall data. Sketch a simple system layout with tank placement and first-flush diverter.",
    durationMinutes: 12,
    contentType: "text",
    quizQuestions: [
      { question: "What is the RUNOFF COEFFICIENT for corrugated iron roofs?", options: ["0.2-0.4", "0.5-0.7", "0.85-0.90", "1.0"], correctIndex: 2, explanation: "Smooth, non-absorbent metal roofs shed 85-90% of rainfall as usable runoff, making them ideal for harvesting." },
      { question: "In the Douala example, what was the ANNUAL harvest potential from a 40.8 m² catchment?", options: ["10,000 L", "50,000 L", "97,920 L", "200,000 L"], correctIndex: 2, explanation: "Using the formula: 40.8 m² × 3,000 mm × 0.8 efficiency = ~98,000 liters per year." },
      { question: "Why is the FIRST-FLUSH diverter CRITICAL?", options: ["To increase water pressure", "To discard the initial dirty runoff containing roof contaminants", "To reduce tank size", "To make installation faster"], correctIndex: 1, explanation: "The first rain washes pollutants off the roof; diverting it significantly improves stored water quality." },
      { question: "What is a PRACTICAL starter tank size for a household on a budget?", options: ["50 L", "1,000-5,000 L", "50,000 L", "100,000 L"], correctIndex: 1, explanation: "Starting with 1,000-5,000 L provides meaningful dry-season supply for critical uses without overwhelming initial investment." },
      { question: "Which tank material is LIGHTWEIGHT and EASY to install?", options: ["Ferro-cement", "Underground masonry", "Polyethylene plastic", "Concrete blocks"], correctIndex: 2, explanation: "Plastic tanks are prefabricated, lightweight, and require minimal foundation work, speeding up installation." },
      { question: "Why ELEVATE the storage tank 1-2 meters?", options: ["To make it look impressive", "To create gravity pressure for water flow to taps without a pump", "To increase evaporation", "To reduce rain collection"], correctIndex: 1, explanation: "Height creates hydrostatic pressure (~0.1 bar per meter), enabling water flow to taps without electricity." },
      { question: "What slope is RECOMMENDED for gutters?", options: ["Flat (0%)", "1:100 (1 cm drop per meter)", "1:10 (10 cm drop per meter)", "Vertical"], correctIndex: 1, explanation: "A gentle slope ensures water flows to the downpipe while allowing debris to be washed away, preventing clogs." },
      { question: "For NON-POTABLE uses (gardening, washing), what filtration is SUFFICIENT?", options: ["No filtration needed", "Mesh filter at tank inlet", "Reverse osmosis system", "UV sterilizer"], correctIndex: 1, explanation: "A simple mesh filter removes leaves and large debris, which is adequate for uses where water isn't ingested." },
      { question: "How often should gutters be cleaned in Cameroon's climate?", options: ["Never", "Only when clogged", "Before rainy season and after heavy storms", "Daily"], correctIndex: 2, explanation: "Proactive cleaning before rains and after storms prevents blockages that cause overflow and water loss." },
      { question: "Why START SMALL with rainwater harvesting?", options: ["Because large systems are illegal", "To learn system management and prove value before scaling investment", "Because small tanks collect more rain", "To avoid helping the community"], correctIndex: 1, explanation: "Piloting with a modest system builds skills, demonstrates benefits, and generates confidence for larger future investments." },
    ],
  },
  // ... [Continuing with modules 2-4 for Rainwater Harvesting]
]).returning();

// === WATER PURIFICATION MODULES (4) ===
const purifyPathway = pathways.find(p => p.title === "Affordable Water Purification: Safe Drinking Water for All")!;
const purifyModules = await db.insert(learningModules).values([
  {
    pathwayId: purifyPathway.id,
    orderIndex: 1,
    title: "Water Quality Testing & Treatment Basics",
    content: `# Water Quality Testing & Treatment Basics\n\n## The Water Challenge in Cameroon\n💧 Access ≠ Safety:\n- **Urban areas**: Piped water may be intermittent; storage risks contamination\n- **Rural areas**: 40% rely on untreated surface water (rivers, ponds)\n- **Health impact**: Waterborne diseases (cholera, typhoid, diarrhea) cause 15% of child deaths\n- **Economic cost**: Families spend time/money treating illness instead of working/learning\n\n## Understanding Water Contaminants\n\n### 🔬 Three Main Types\n| Type | Examples | Health Risk | Removal Method |\n|------|----------|-------------|---------------|\n| **Physical** | Sediment, rust, organic matter | Aesthetic issues; can harbor microbes | Filtration, settling |\n| **Chemical** | Heavy metals, pesticides, excess fluoride | Long-term toxicity; organ damage | Activated carbon, specialized filters |\n| **Biological** | Bacteria, viruses, parasites (E. coli, Giardia) | Acute illness: diarrhea, vomiting, fever | Disinfection: boiling, chlorination, UV, filtration |\n\n✅ **Priority for household treatment**: Focus on biological contaminants (most immediate risk)\n\n## Simple Field Testing Methods\n\n### 👁️ Visual & Sensory Checks (First Step)\n- **Clarity**: Hold glass to light; should see clearly through water\n- **Color**: Should be colorless; yellow/brown may indicate organics or iron\n- **Odor**: Should be odorless; rotten egg smell = hydrogen sulfide; musty = algae\n- **Taste**: Should be neutral; metallic taste may indicate iron/copper\n\n⚠️ *These checks identify obvious problems but DO NOT confirm safety*\n\n### 🧪 Low-Cost Test Options\n| Test | What It Detects | Cost (XAF) | Where to Get |\n|------|-----------------|------------|--------------|\n| **Turbidity tube** | Cloudiness (suspended particles) | 5,000-15,000 | NGOs, environmental agencies |\n| **E. coli test strips** | Fecal contamination indicator | 1,000-3,000/strip | Pharmacies, health centers |\n| **pH test strips** | Acidity/alkalinity (affects treatment efficacy) | 500-2,000/pack | Hardware stores, labs |\n| **Chlorine test kit** | Residual chlorine after treatment | 2,000-5,000 | Water treatment suppliers |\n\n✅ **Recommendation**: Partner with local health centers or NGOs for periodic testing\n\n## Household Water Treatment Options: Pros & Cons\n\n### 🔥 Boiling\n**How**: Bring water to rolling boil for 1 minute (3 minutes at high altitude)\n\n✅ **Pros**:\n- Kills all pathogens (bacteria, viruses, parasites)\n- No chemicals; uses available fuel\n- Simple, universally understood\n\n❌ **Cons**:\n- Fuel cost/time (0.5-1 kg wood per 10L boiled)\n- Doesn't remove chemicals or improve taste/odor\n- Risk of recontamination during cooling/storage\n\n### ☀️ Solar Disinfection (SODIS)\n**How**: Fill clear PET bottles (≤2L); lay in full sun for 6 hours (or 2 days if cloudy)\n\n✅ **Pros**:\n- Zero cost after initial bottles\n- Effective against bacteria, viruses, protozoa\n- Empowers households with simple method\n\n❌ **Cons**:\n- Requires strong sunlight (less effective in rainy season)\n- Bottles degrade after ~6 months of UV exposure\n- Doesn't remove chemical contaminants or turbidity\n\n### 💧 Chlorination\n**How**: Add correct dose of chlorine (liquid bleach or tablets); wait 30 minutes\n\n✅ **Pros**:\n- Fast, effective against most pathogens\n- Provides residual protection in storage\n- Low cost (~10-50 XAF per 20L treated)\n\n❌ **Cons**:\n- Taste/odor may be objectionable (can be reduced by aeration)\n- Incorrect dosing risks under/over-treatment\n- Less effective against some parasites (e.g., Cryptosporidium)\n\n### 🪨 Bio-Sand Filter (BSF)\n**How**: Layer of sand/gravel in concrete/plastic container; biological layer (schmutzdecke) forms on top\n\n✅ **Pros**:\n- Removes sediment, turbidity, and 90-99% of pathogens\n- No chemicals or fuel needed after construction\n- Long lifespan (5-10 years) with simple maintenance\n\n❌ **Cons**:\n- Initial construction cost/time (20,000-50,000 XAF)\n- Requires training to build/maintain correctly\n- Doesn't remove dissolved chemicals or viruses as effectively as bacteria\n\n## Choosing the Right Method: Decision Guide\n\n### 🎯 Match Treatment to Water Source & Risk\n| Water Source | Likely Contaminants | Recommended Treatment(s) |\n|--------------|---------------------|--------------------------|\n| **Protected well/spring** | Low turbidity; possible bacterial contamination | Chlorination or SODIS |\n| **River/pond **(untreated) | High turbidity; high biological risk | BSF + chlorination/SODIS (two-barrier approach) |\n| **Rainwater **(stored) | Low pathogens; possible roof contaminants | First-flush diversion + chlorination for drinking |\n| **Piped water **(intermittent) | Recontamination during storage | Chlorination at point of use |\n\n### 💡 Two-Barrier Principle\n✅ **Best practice**: Combine two methods for higher safety:\n1. **Physical removal**: Filter or settle to reduce turbidity\n2. **Disinfection**: Boil, chlorinate, or SODIS to kill pathogens\n\n*Example*: Use a cloth filter to remove sediment → then chlorinate for drinking\n\n## Safe Storage: The Final Critical Step\n\n### 🪣 Storage Best Practices\n✅ **Use narrow-mouth containers** with tight-fitting lids (reduces recontamination)\n✅ **Label containers**: "Treated Water – Do Not Dip Hands"\n✅ **Use a clean ladle or tap** to withdraw water (never hands/cups)\n✅ **Store in cool, dark place** to slow microbial regrowth\n✅ **Clean containers weekly** with soap and safe water\n\n### 🔄 Household Water Handling Routine\n1. Treat water (e.g., chlorinate)\n2. Store in labeled, covered container\n3. Use clean utensil to withdraw\n4. Keep container off floor (use shelf or stand)\n5. Refill only after container is empty and cleaned\n\n💡 *Even perfectly treated water can become unsafe if stored poorly.*`,
    summary: "Understanding water contaminants, simple testing methods, and selecting appropriate household treatment options",
    practicalTask: "Test a water source you use (tap, well, river) with visual/sensory checks. Research local availability of E. coli test strips or chlorination supplies. Practice preparing a correct chlorine dose for 20L of water.",
    durationMinutes: 11,
    contentType: "text",
    quizQuestions: [
      { question: "What is the PRIMARY health risk from untreated water in Cameroon?", options: ["Bad taste", "Waterborne diseases like diarrhea and cholera", "High cost", "Color changes"], correctIndex: 1, explanation: "Biological contaminants in water cause acute illnesses that are a leading cause of child mortality and lost productivity." },
      { question: "Which contaminant type poses the MOST IMMEDIATE health risk?", options: ["Physical (sediment)", "Chemical (heavy metals)", "Biological (bacteria, viruses)", "Aesthetic (color)"], correctIndex: 2, explanation: "Pathogens can cause illness within hours/days of consumption, while chemical risks are often long-term." },
      { question: "What does a SIMPLE visual check for water clarity involve?", options: ["Tasting the water", "Holding a glass to light to see if you can read through it", "Measuring pH with a meter", "Boiling a sample"], correctIndex: 1, explanation: "Clarity testing is a quick first step: clear water allows light to pass through, indicating low turbidity." },
      { question: "Which low-cost test detects FECAL contamination?", options: ["pH strips", "Turbidity tube", "E. coli test strips", "Chlorine test kit"], correctIndex: 2, explanation: "E. coli is an indicator organism; its presence suggests fecal contamination and potential pathogens." },
      { question: "How long should water be BOILED to ensure safety?", options: ["30 seconds", "1 minute at sea level (3 minutes at high altitude)", "5 minutes", "Until all water evaporates"], correctIndex: 1, explanation: "A rolling boil for 1 minute (longer at altitude where water boils at lower temperature) kills virtually all pathogens." },
      { question: "What is a KEY LIMITATION of SODIS (solar disinfection)?", options: ["It costs too much", "It requires strong sunlight and clear bottles", "It adds chemicals to water", "It makes water salty"], correctIndex: 1, explanation: "SODIS relies on UV-A radiation and heat; cloudy weather or dirty bottles reduce effectiveness." },
      { question: "Why is the 'TWO-BARRIER' approach recommended?", options: ["To double the cost", "To increase safety by combining physical removal and disinfection", "To use more water", "To comply with international law"], correctIndex: 1, explanation: "Multiple treatment steps provide redundancy; if one method underperforms, the other still reduces risk." },
      { question: "What is the PURPOSE of a bio-sand filter's 'schmutzdecke'?", options: ["To make the filter look professional", "A biological layer that traps and consumes pathogens", "To increase water flow speed", "To add minerals to water"], correctIndex: 1, explanation: "The schmutzdecke is a gelatinous biofilm on the sand surface that is critical for biological removal of microbes." },
      { question: "Why use NARROW-MOUTH containers for stored treated water?", options: ["They are cheaper", "They reduce the risk of recontamination from hands or objects", "They hold more water", "They are easier to clean"], correctIndex: 1, explanation: "Limited opening minimizes contact with contaminants during water withdrawal, preserving treatment benefits." },
      { question: "What is the MOST CRITICAL step after treating water?", options: ["Advertising the service", "Storing it safely to prevent recontamination", "Adding flavoring", "Using it immediately only"], correctIndex: 1, explanation: "Even perfectly treated water can become unsafe if stored in dirty containers or handled with unclean hands." },
    ],
  },
  // ... [Continuing with modules 2-4 for Water Purification]
]).returning();

console.log("✅ All remaining pathways and modules inserted successfully!");


  // ##########################################################################################################################

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