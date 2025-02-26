const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const chalk = require("chalk"); // For colored console output

/**
 * Automatically discover shadcn components by scanning the components/ui directory
 */
function discoverComponents() {
  const uiDir = path.join(__dirname, "components", "ui");

  if (!fs.existsSync(uiDir)) {
    console.error(chalk.red("❌ components/ui directory not found"));
    return [];
  }

  return fs
    .readdirSync(uiDir)
    .filter((file) => {
      const filePath = path.join(uiDir, file);
      const stats = fs.statSync(filePath);

      // Include directories and .tsx files (excluding index files)
      return (
        stats.isDirectory() ||
        (file.endsWith(".tsx") && !file.includes("index"))
      );
    })
    .map((file) => file.replace(".tsx", ""));
}

/**
 * Update all discovered shadcn components
 */
async function updateComponents() {
  // Discover components
  const components = discoverComponents();

  if (components.length === 0) {
    console.log(chalk.yellow("⚠️ No components found to update"));
    return;
  }

  console.log(
    chalk.blue(`🔄 Updating ${components.length} Shadcn UI components...`)
  );

  // Track results
  const results = {
    success: [],
    failed: [],
  };

  // Update each component
  for (const component of components) {
    try {
      console.log(chalk.cyan(`📦 Updating ${component}...`));
      execSync(`npx shadcn-ui@latest add ${component} --overwrite`, {
        stdio: "inherit",
      });
      console.log(chalk.green(`✅ ${component} updated successfully`));
      results.success.push(component);
    } catch (error) {
      console.error(
        chalk.red(`❌ Failed to update ${component}:`),
        error.message
      );
      results.failed.push(component);
    }
  }

  // Summary
  console.log(chalk.blue("\n📊 Update Summary:"));
  console.log(
    chalk.green(`✅ Successfully updated: ${results.success.length} components`)
  );

  if (results.failed.length > 0) {
    console.log(
      chalk.red(`❌ Failed to update: ${results.failed.length} components`)
    );
    console.log(chalk.yellow("Failed components:"), results.failed.join(", "));
  }

  console.log(chalk.green("\n🎉 Update process completed!"));
}

// Run the update function
updateComponents().catch((err) => {
  console.error(chalk.red("Error in update process:"), err);
  process.exit(1);
});
