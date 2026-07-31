/* eslint-disable no-console */
import 'dotenv/config'; 
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@fsm/db';

// ... Keep your exact variables (TECHS, CUSTOMERS, PROFILES_REGISTRY, etc.) exactly as they are here ...

function at(dayOffset: number, hour: number): string {
  const d = new Date();
  d.setDate(d.getDate() + dayOffset);
  d.setHours(hour, 0, 0, 0);
  return d.toISOString();
}

function plusHours(iso: string, hours: number): string {
  return new Date(new Date(iso).getTime() + hours * 3600_000).toISOString();
}
const TECHS = [
  { id: 'tech_amir', name: 'Amir Kaplan' },
  { id: 'tech_dana', name: 'Dana Ruiz' },
  { id: 'tech_leo', name: 'Leo Chen' },
  { id: 'tech_james', name: 'James Adell'},
  { id: 'lead_jaime', name: 'Jaime Perez' },
  { id: 'supervisor_luis', name: 'Luis Florez' },
  { id: 'runner_chris', name: 'Chris Johnson' },
  { id: 'sales_advisor_sammy', name: 'Sam Murphy' },
  { id: 'installer_manual', name: 'Manual Hernandez' },
];

type SeedCustomer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: { line1: string; city: string; state: string; postalCode: string };
  serviceType: string;
  priority: 'low' | 'normal' | 'urgent';
  visits: Array<{ dayOffset: number; hour: number; durationH: number; tech: number; title: string; status?: string }>;
};

const PROFILES_REGISTRY: Record<string, { companyName: string; subdomain: string; customers: SeedCustomer[] }> = {
  "hvac-orange-county": {
    companyName: "Pacific Coast HVAC & Air Pro",
    subdomain: "pacific-hvac",
    customers: [
      {
        id: 'cust_oc_hvac_1',
        name: 'Hendricks Residence',
        email: 'sara.h@gmail.com',
        phone: '(714) 555-0398',
        address: { line1: '1420 Oak Meadow Dr', city: 'Anaheim', state: 'CA', postalCode: '92805' },
        serviceType: 'HVAC Emergency',
        priority: 'urgent',
        visits: [
          { dayOffset: 0, hour: 9, durationH: 2, tech: 4, title: 'AC not cooling — diagnostic' },
          { dayOffset: 3, hour: 13, durationH: 3, tech: 6, title: 'Compressor replacement' },
        ],
      },
      {
        id: 'cust_oc_hvac_2',
        name: 'Susie Bright Holdings',
        email: 'ops@brightoc.com',
        phone: '(657) 555-0192',
        address: { line1: '2138 Grass Ave', city: 'Garden Grove', state: 'CA', postalCode: '92840' },
        serviceType: 'Refrigeration System Scan',
        priority: 'normal',
        visits: [
          { dayOffset: 1, hour: 8, durationH: 2, tech: 1, title: 'Walk-in cooler maintenance' },
        ],
      }
    ]
  },

  "plumbing-south-bay": {
    companyName: "South Bay Elite Plumbing & Drain",
    subdomain: "southbay-plumbing",
    customers: [
      {
        id: 'cust_la_plumb_1',
        name: 'Torrance Commercial Plaza',
        email: 'facilities@torranceplaza.com',
        phone: '(310) 555-9821',
        address: { line1: '3520 Carson St', city: 'Torrance', state: 'CA', postalCode: '90503' },
        serviceType: 'Hydro-Jetting Main Sewer Line',
        priority: 'urgent',
        visits: [
          { dayOffset: 0, hour: 7, durationH: 4, tech: 5, title: 'Main line obstruction emergency hydrojet' }
        ],
      },
      {
        id: 'cust_la_plumb_2',
        name: 'Long Beach Marina Logistics',
        email: 'ops@lbmarinalogistics.com',
        phone: '(562) 555-4311',
        address: { line1: '100 Aquarium Way', city: 'Long Beach', state: 'CA', postalCode: '90802' },
        serviceType: 'Commercial Backflow Testing',
        priority: 'normal',
        visits: [
          { dayOffset: 2, hour: 10, durationH: 2, tech: 2, title: 'Annual backflow assembly inspection' }
        ],
      }
    ]
  },
  "electrical-north-county": {
    companyName: "North County Industrial Electrical",
    subdomain: "northcounty-elec",
    customers: [
      {
        id: 'cust_sd_elec_1',
        name: 'Carlsbad Tech Hub Center',
        email: 'facilities@carlsbadtech.com',
        phone: '(760) 555-8812',
        address: { line1: '5200 Innovation Way', city: 'Carlsbad', state: 'CA', postalCode: '92008' },
        serviceType: 'Industrial Subpanel Upgrade',
        priority: 'urgent',
        visits: [
          { dayOffset: 1, hour: 8, durationH: 5, tech: 4, title: 'Phase 1 transformer breaker panel upgrade' }
        ],
      },
      {
        id: 'cust_sd_elec_2',
        name: 'Oceanside Harbor Retail Group',
        email: 'management@oceansideharbor.com',
        phone: '(760) 555-2311',
        address: { line1: '300 Harbor Dr', city: 'Oceanside', state: 'CA', postalCode: '92054' },
        serviceType: 'Exterior LED Matrix Repair',
        priority: 'low',
        visits: [
          { dayOffset: 4, hour: 13, durationH: 3, tech: 7, title: 'Pole lighting circuit troubleshooting' }
        ],
      }
    ]
  },

  "refrigeration-riverside": {
    companyName: "Inland Empire Mechanical & Chiller Systems",
    subdomain: "inland-refrigeration",
    customers: [
      {
        id: 'cust_riv_mech_1',
        name: 'Corona Cold Storage Facility',
        email: 'ops@coronacold.com',
        phone: '(951) 555-7722',
        address: { line1: '1200 Magnolia Ave', city: 'Corona', state: 'CA', postalCode: '92879' },
        serviceType: 'Chiller Leak Isolation',
        priority: 'urgent',
        visits: [
          { dayOffset: 0, hour: 11, durationH: 3, tech: 0, title: 'Freon loop pressure diagnostics and reclamation' }
        ],
      },
      {
        id: 'cust_riv_mech_2',
        name: 'Riverside Distribution Hub',
        email: 'maintenance@rivdist.com',
        phone: '(951) 555-9011',
        address: { line1: '4500 Market St', city: 'Riverside', state: 'CA', postalCode: '92501' },
        serviceType: 'Condenser Coil Descaling',
        priority: 'normal',
        visits: [
          { dayOffset: 3, hour: 8, durationH: 4, tech: 8, title: 'Quarterly predictive maintenance loop' }
        ],
      }
    ]
  },
  "roofing-san-bernardino": {
    companyName: "Cucamonga Valley Commercial Roofing",
    subdomain: "cucamonga-roofing",
    customers: [
      {
        id: 'cust_sb_roof_1',
        name: 'Rancho Cucamonga Logistics Center',
        email: 'logistics@ranchocucamonga.com',
        phone: '(909) 555-1144',
        address: { line1: '10900 Foothill Blvd', city: 'Rancho Cucamonga', state: 'CA', postalCode: '91730' },
        serviceType: 'TPO Membrane Seam Repair',
        priority: 'urgent',
        visits: [
          { dayOffset: 1, hour: 6, durationH: 6, tech: 5, title: 'Emergency flat roof patch post-storm' }
        ],
      },
      {
        id: 'cust_sb_roof_2',
        name: 'Ontario Warehouse Fleet Garages',
        email: 'fleetops@ontariowarehouses.com',
        phone: '(909) 555-8855',
        address: { line1: '2500 E Airport Dr', city: 'Ontario', state: 'CA', postalCode: '91761' },
        serviceType: 'Parapet Cap Flashing Restoration',
        priority: 'normal',
        visits: [
          { dayOffset: 5, hour: 9, durationH: 4, tech: 6, title: 'Structural metal trim correction' }
        ],
      }
    ]
  },

  "fire-safety-south-oc": {
    companyName: "Orange County Fire Protection Group",
    subdomain: "oc-fire-safety",
    customers: [
      {
        id: 'cust_soc_fire_1',
        name: 'Mission Viejo Medical Complex',
        email: 'compliance@mvmedical.com',
        phone: '(949) 555-3399',
        address: { line1: '27700 Medical Center Rd', city: 'Mission Viejo', state: 'CA', postalCode: '92691' },
        serviceType: 'Dry Pipe Valve Overhaul',
        priority: 'urgent',
        visits: [
          { dayOffset: 0, hour: 13, durationH: 4, tech: 4, title: 'Re-building accelerator assembly trip mechanics' }
        ],
      },
      {
        id: 'cust_soc_fire_2',
        name: 'San Clemente Outlets Resort',
        email: 'security@sanclementeoutlets.com',
        phone: '(949) 555-7766',
        address: { line1: '101 W Avenida Vista Hermosa', city: 'San Clemente', state: 'CA', postalCode: '92672' },
        serviceType: '5-Year Sprinkler Certification',
        priority: 'normal',
        visits: [
          { dayOffset: 6, hour: 22, durationH: 6, tech: 5, title: 'Hydrostatic pressure piping validation testing' }
        ],
      }
    ]
  },
  "glazing-west-la": {
    companyName: "Metro Architectural Glass & Glazing",
    subdomain: "metro-glazing",
    customers: [
      {
        id: 'cust_wla_glass_1',
        name: 'Santa Monica Promenade Mall',
        email: 'ops@smpromenade.com',
        phone: '(310) 555-4400',
        address: { line1: '1350 Third Street Promenade', city: 'Santa Monica', state: 'CA', postalCode: '90401' },
        serviceType: 'Tempered Storefront Replacement',
        priority: 'urgent',
        visits: [
          { dayOffset: 0, hour: 5, durationH: 3, tech: 8, title: 'Emergency storefront cleanout and structural fitting' }
        ],
      },
      {
        id: 'cust_wla_glass_2',
        name: 'Culver City Creative Studios',
        email: 'facilities@culverstudios.com',
        phone: '(310) 555-9922',
        address: { line1: '9336 Washington Blvd', city: 'Culver City', state: 'CA', postalCode: '92032' },
        serviceType: 'Curtain-Wall Sealant Remediation',
        priority: 'normal',
        visits: [
          { dayOffset: 3, hour: 9, durationH: 4, tech: 3, title: 'High-elevation exterior perimeter caulking loop' }
        ],
      }
    ]
  },

  "elevator-coastal-socal": {
    companyName: "SoCal Apex Elevator & Lift Services",
    subdomain: "socal-elevator",
    customers: [
      {
        id: 'cust_cst_elev_1',
        name: 'Newport Beach Coastal Highrise',
        email: 'pm@newporthighrise.com',
        phone: '(949) 555-1212',
        address: { line1: '620 Newport Center Drive', city: 'Newport Beach', state: 'CA', postalCode: '92660' },
        serviceType: 'Hydraulic Governor Calibration',
        priority: 'urgent',
        visits: [
          { dayOffset: 1, hour: 10, durationH: 3, tech: 5, title: 'Overspeed safety governor alignment adjustments' }
        ],
      },
      {
        id: 'cust_cst_elev_2',
        name: 'Huntington Beach Pacific Resort',
        email: 'eng@hbpacificresort.com',
        phone: '(714) 555-9090',
        address: { line1: '21100 Pacific Coast Hwy', city: 'Huntington Beach', state: 'CA', postalCode: '92648' },
        serviceType: 'Traction Lift Cable NDT Scan',
        priority: 'normal',
        visits: [
          { dayOffset: -2, hour: 13, durationH: 4, tech: 6, title: 'Non-destructive electronic cable wear diagnostics', status: 'COMPLETED' }
        ],
      }
    ]
  },
  "solar-tri-county": {
    companyName: "Tri-County Commercial Solar & Grid Energy",
    subdomain: "tricounty-solar",
    customers: [
      {
        id: 'cust_tri_solar_1',
        name: 'Chino Hills Logistics Vault',
        email: 'energy@chinohillsvault.com',
        phone: '(909) 555-4545',
        address: { line1: '15800 Fairfield Ranch Rd', city: 'Chino Hills', state: 'CA', postalCode: '91709' },
        serviceType: 'Inverter Array Topology Flash',
        priority: 'urgent',
        visits: [
          { dayOffset: 0, hour: 8, durationH: 3, tech: 2, title: 'Firmware stabilization sequence tracking core fault failures' }
        ],
      },
      {
        id: 'cust_tri_solar_2',
        name: 'Pomona College Auxiliary Grid Array',
        microgrid: 'microgrid@pomonaaux.org',
        email: 'microgrid@pomonaaux.org',
        phone: '(909) 555-6262',
        address: { line1: '333 N College Way', city: 'Pomona', state: 'CA', postalCode: '91711' },
        serviceType: 'Micro-Grid Transformer Verification',
        priority: 'normal',
        visits: [
          { dayOffset: 4, hour: 11, durationH: 2, tech: 4, title: 'Isolating phase discrepancies across battery units' }
        ],
      }
    ]
  },

  "automation-tech-coast": {
    companyName: "Newport Smart Automation & Control Systems",
    subdomain: "newport-automation",
    customers: [
      {
        id: 'cust_tc_auto_1',
        name: 'Laguna Beach Ocean Estates Mansion',
        email: 'concierge@lagunaoceanestates.com',
        phone: '(949) 555-8008',
        address: { line1: '31900 Coast Hwy', city: 'Laguna Beach', state: 'CA', postalCode: '92651' },
        serviceType: 'Fiber Backbone Node Restructure',
        priority: 'urgent',
        visits: [
          { dayOffset: 0, hour: 14, durationH: 4, tech: 3, title: 'Splicing main distribution frame fiber trunk connections' }
        ],
      },
      {
        id: 'cust_tc_auto_2',
        name: 'Irvine Spectrum Development Offices',
        email: 'facilities@irvinespectrumhq.com',
        phone: '(949) 555-3030',
        address: { line1: '8000 Innovation Dr', city: 'Irvine', state: 'CA', postalCode: '92618' },
        serviceType: 'Access Control Matrix Topology',
        priority: 'normal',
        visits: [
          { dayOffset: 2, hour: 9, durationH: 3, tech: 1, title: 'Biometric card terminal synchronization across zones' }
        ],
      }
    ]
  }
};
// CHANGE THIS: Export a named asynchronous function that receives the raw CLI inputs
export async function seedDemoMatrix(companyIdArg: string, profileArg: string) {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });
  
   // Get the selected company profile configuration layout block
  const dataset = PROFILES_REGISTRY[profileArg];
  
  if (!dataset) {
    console.error(`❌ Strategy Error: Selected profile target key [${profileArg}] does not exist.`);
    return;
  }

  }
 if (!dataset) {
    console.error(`❌ Strategy Error: Selected profile target key [${profileArg}] does not exist.`);
    process.exit(1);
  }

  console.log(`\n🏢 Initializing Infrastructure Dataset: ${dataset.companyName}`);
  console.log(`📍 Binding System Entities to dynamic Company ID: [${companyIdArg}]`);

  // 1. Core Company Layer Setup
  await prisma.company.upsert({
    where: { id: companyIdArg },
    update: { name: dataset.companyName },
    create: { id: companyIdArg, name: dataset.companyName, subdomain: dataset.subdomain },
  });

  // 2. Company Feature Schema Config Mapping
  await prisma.companyConfig.upsert({
    where: { companyId_version: { companyId: companyIdArg, version: 1 } },
    update: { isActive: true },
    create: {
      id: `config_${companyIdArg.substring(0, 8)}`,
      companyId: companyIdArg,
      version: 1,
      isActive: true,
      contentHash: `hash-${profileArg}-v1`,
      schema: {
        version: '1.0',
        features: ['scheduling', 'documents', 'customer-portal'],
        customerPortal: {
          title: `${dataset.companyName} Hub`,
          description: 'View upcoming field diagnostics logs, track vehicle loops, and update access permissions.',
          primaryColor: '#0ea5e9',
          allowReschedule: true,
        },
      },
    },
  });

  // 3. Office & Dispatch Employee Rosters Integration
  const users = [
    { id: `owner_${companyIdArg.substring(0,4)}`, email: `owner@${dataset.subdomain}.demo`, name: 'Marcus Sterling', role: 'OWNER' as const },
    { id: `csr_${companyIdArg.substring(0,4)}`, email: `csr@${dataset.subdomain}.demo`, name: 'Clara Jenkins', role: 'CSR' as const },
    { id: TECHS[0]!.id, email: `tech1@${dataset.subdomain}.demo`, name: TECHS[0]!.name, role: 'FIELD' as const },
    { id: `tech2_${companyIdArg.substring(0,4)}`, email: `tech2@${dataset.subdomain}.demo`, name: TECHS[1]!.name, role: 'FIELD' as const },
    { id: `tech3_${companyIdArg.substring(0,4)}`, email: `tech3@${dataset.subdomain}.demo`, name: TECHS[2]!.name, role: 'FIELD' as const },
  ];

  for (const u of users) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: { name: u.name, role: u.role, companyId: companyIdArg },
      create: { ...u, companyId: companyIdArg },
    });
  }

  // Clear out matching entries for structural execution tracking guarantees
  await prisma.job.deleteMany({ where: { companyId: companyIdArg } });

  // 4. Jobs & Multi-Tenant Encapsulated JSONB Payload Processing Loop
  for (const c of dataset.customers) {
    const visits = c.visits.map((v, i) => {
      const start = at(v.dayOffset, v.hour);
      const safeTechIndex = v.tech % TECHS.length;
      const tech = TECHS[safeTechIndex]!;
      
      return {
        id: `visit_${companyIdArg.substring(0,4)}_${c.id}_${i}`,
        title: v.title,
        technicianId: tech.id,
        technicianName: tech.name,
        start,
        end: plusHours(start, v.durationH),
        status: v.status ?? 'SCHEDULED',
        notes: 'Simulated infrastructure asset verification telemetry tracking logging metrics complete.',
      };
    });

    const status = visits.length === 0 ? 'NEW' : visits.every((v) => v.status === 'COMPLETED') ? 'COMPLETED' : 'SCHEDULED';

    await prisma.job.create({
      data: {
        companyId: companyIdArg,
        contentHash: `ledger-hash-${c.id}-${companyIdArg.substring(0,4)}`,
        previousHash: '0'.repeat(64),
        createdBy: `csr_${companyIdArg.substring(0,4)}`,
        data: {
          status,
          customerName: c.name,
          customerEmail: c.email,
          customerPhone: c.phone,
          customerPriority: c.priority,
          serviceType: c.serviceType,
          address: c.address,
          scheduledVisits: visits,
          virtualVaultAttachment: `company-vault/${companyIdArg}/portals/contract_${c.id}.pdf`
        } as any
      }
    });
  }

  console.log(`✅ Structural Dataset Population Finalized for: [${profileArg}]`);
}

executeSeederMatrix()
  .catch((e) => {
    console.error('❌ Regional Data Matrix Seeding Crashed:', e);
    process.exit(1);
  })
 // Clean up connections at the trailing edge of this tenant block invocation
  await prisma.$disconnect();
  await pool.end();
  console.log(`✅ Structural Dataset Population Finalized for: [${profileArg}]`);

