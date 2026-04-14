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