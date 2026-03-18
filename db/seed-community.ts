// src/db/seed-community.ts
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { communityEvents } from "../config/schema";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

async function seedCommunity() {
  console.log("🌍 Seeding community data...\n");

  // Events
  const now = new Date();
  const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  const nextMonth = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
  const twoMonths = new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000);

  const events = await db
    .insert(communityEvents)
    .values([
      {
        title: "Composting Workshop for Beginners",
        description:
          "Learn how to start composting at home or in your community. Hands-on training with local materials. Free entry, open to all youths aged 18-35.",
        eventType: "workshop",
        location: "IRAD Research Center, Yaoundé",
        region: "centre",
        date: nextWeek,
        endDate: nextWeek,
        organizer: "GreenSkill Hub & IRAD",
        isActive: true,
      },
      {
        title: "Green Business Pitch Competition — Douala",
        description:
          "Present your green business idea to a panel of investors and mentors. Top 3 winners receive seed funding of 500,000 XAF each plus 3 months of mentorship.",
        eventType: "competition",
        location: "Douala Business Hub",
        region: "littoral",
        date: nextMonth,
        endDate: nextMonth,
        link: "https://example.com/pitch-competition",
        organizer: "Cameroon Green Enterprise Network",
        isActive: true,
      },
      {
        title: "Solar Installation Training (Online)",
        description:
          "Free 5-day online training on basic solar panel installation and maintenance. Certificate provided upon completion. Limited to 50 participants.",
        eventType: "training",
        location: "Online (Zoom)",
        region: null,
        date: nextMonth,
        endDate: new Date(nextMonth.getTime() + 5 * 24 * 60 * 60 * 1000),
        link: "https://example.com/solar-training",
        organizer: "SolarAfrica Foundation",
        isActive: true,
      },
      {
        title: "Youth Green Innovation Fund — Applications Open",
        description:
          "The Ministry of Environment and UNDP are offering grants of up to 2,000,000 XAF for youth-led green projects. Application deadline: end of month.",
        eventType: "funding",
        location: "Nationwide",
        region: null,
        date: now,
        endDate: twoMonths,
        link: "https://example.com/green-fund",
        organizer: "MINEPDED & UNDP Cameroon",
        isActive: true,
      },
      {
        title: "Bamenda Green Skills Meetup",
        description:
          "Monthly meetup for youths interested in green skills and entrepreneurship in the Northwest region. Share experiences, network, and collaborate.",
        eventType: "meetup",
        location: "Bamenda City Mall, Conference Room",
        region: "northwest",
        date: nextMonth,
        organizer: "NW Green Youth Network",
        isActive: true,
      },
      {
        title: "Waste-to-Wealth Workshop — Buea",
        description:
          "Practical workshop on turning plastic waste into products: paving blocks, bags, and crafts. Materials provided. Bring your creativity!",
        eventType: "workshop",
        location: "Buea Community Hall",
        region: "southwest",
        date: new Date(nextMonth.getTime() + 7 * 24 * 60 * 60 * 1000),
        organizer: "EcoAction SW",
        isActive: true,
      },
    ])
    .returning();

  console.log(`  ✅ Inserted ${events.length} community events\n`);
  console.log("✅ Community seeding complete!");
}

seedCommunity()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("❌ Seed failed:", err);
    process.exit(1);
  });