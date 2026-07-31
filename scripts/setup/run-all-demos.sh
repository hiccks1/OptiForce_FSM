#!/bin/bash
# run-all-demos.sh - Automated Onboarding & Demographic Matrix Bridge

# 1. Define all 10 specialized Southern California contractor profiles
PROFILES=(
  "hvac-orange-county"
  "plumbing-south-bay"
  "electrical-north-county"
  "refrigeration-riverside"
  "roofing-san-bernardino"
  "fire-safety-south-oc"
  "glazing-west-la"
  "elevator-coastal-socal"
  "solar-tri-county"
  "automation-tech-coast"
)

# 2. Map friendly display names for Question 1
COMPANY_NAMES=(
  "Pacific Coast HVAC & Air Pro"
  "South Bay Elite Plumbing & Drain"
  "North County Industrial Electrical"
  "Inland Empire Mechanical & Chiller Systems"
  "Cucamonga Valley Commercial Roofing"
  "Orange County Fire Protection Group"
  "Metro Architectural Glass & Glazing"
  "SoCal Apex Elevator & Lift Services"
  "Tri-County Commercial Solar & Grid Energy"
  "Newport Smart Automation & Control Systems"
)

# 3. Map exact allowed industry options for Question 2
INDUSTRIES=(
  "HVAC"
  "Plumbing"
  "Electrical"
  "Roofing"
  "General"
  "Other"
  "General"
  "Other"
  "Other"
  "Other"
)

echo "🌊 Initializing automated SoCal demographic demo hydration engine..."

# 4. Loop through all 10 companies sequentially
for i in "${!PROFILES[@]}"
do
  PROFILE="${PROFILES[$i]}"
  NAME="${COMPANY_NAMES[$i]}"
  IND="${INDUSTRIES[$i]}"
  
  echo "--------------------------------------------------------"
  echo "🏢 Processing Strategy: [$PROFILE]"

  # 7. RUN DATABASE WORKSPACE HYDRATION VIA THE MONOREPO ALIAS INTERFACE
  echo "🚀 Blasting local demographic data payload into PostgreSQL via @fsm/db workspace..."
  
  pnpm tsx "$ROOT_DIR/run-seed.ts" --companyId="$EXTRACTED_COMPANY_ID" --profile="$PROFILE"

  
  # Run your verified init file path natively
  INIT_OUTPUT=$(./scripts/setup/init.sh <<EOF
$NAME
$IND
America/Los_Angeles
USD
3
no
yes
0.8
yes
EOF
)

  # Print out the clean onboarding console logs so you can see it working
  echo "$INIT_OUTPUT"

  echo "⏳ Extracting newly generated Company ID from terminal data..."
  
  # 6. EXTRACT DIRECTLY FROM THE PRINTED TERMINAL STRINGS
  # Looks for the clean 'ID: d321fe16...' parameter line inside your text block
  EXTRACTED_COMPANY_ID=$(echo "$INIT_OUTPUT" | grep -E "ID:" | head -n 1 | awk '{print $2}' | tr -d '[:space:]' | tr -d "',\";")

  # Fallback check for the 'Company ID:' label at the bottom of your logs
  if [ -z "$EXTRACTED_COMPANY_ID" ]; then
    EXTRACTED_COMPANY_ID=$(echo "$INIT_OUTPUT" | grep -E "Company ID:" | head -n 1 | awk '{print $3}' | tr -d '[:space:]' | tr -d "',\";")
  fi

  if [ -z "$EXTRACTED_COMPANY_ID" ]; then
    echo "❌ Error: Could not parse a valid Company ID from the init terminal logs!"
    exit 1
  fi

  echo "🔑 System Target UUID Located: [$EXTRACTED_COMPANY_ID]"

  # 7. RUN DATABASE PROFILE HYDRATION WITH DIRECT PATHS
  echo "🚀 Blasting local demographic data payload into PostgreSQL..."
  pnpm tsx prisma/seeds/demo-matrix.ts --companyId="$EXTRACTED_COMPANY_ID" --profile="$PROFILE"

  echo "✅ Instance configurations finalized for: $PROFILE"
done

echo "--------------------------------------------------------"
echo "🎉 WALKTHROUGH READY: All 10 high-tier V1 demo spaces initialized successfully!"
