/**
 * @fileoverview Test runner for multi-language SAST scanner testing
 * @description Tests SAST scanner with vulnerable code samples in multiple languages
 * @author Gunabalan S
 * @created 2025-01-21
 */

const path = require('path');
const { runSastScans } = require('../../src/lib/sast');

const TEST_REPO_PATH = __dirname;

/**
 * Run SAST scan on test repository
 */
async function runTests() {
  console.log('🧪 Starting Multi-Language SAST Scanner Tests\n');
  console.log('='.repeat(60));
  console.log(`Test Repository: ${TEST_REPO_PATH}`);
  console.log('='.repeat(60) + '\n');

  try {
    const startTime = Date.now();

    // Run SAST scan
    const results = await runSastScans(TEST_REPO_PATH, {
      fastMode: false,
      repositoryInfo: {
        name: 'multi-lang-test',
        url: 'test://multi-lang-test',
      },
    });

    const duration = Date.now() - startTime;

    // Display results
    console.log('\n' + '='.repeat(60));
    console.log('📊 SCAN RESULTS SUMMARY');
    console.log('='.repeat(60));
    console.log(`Scan ID: ${results.scanId}`);
    console.log(`Status: ${results.status}`);
    console.log(`Duration: ${duration}ms (${(duration / 1000).toFixed(2)}s)`);
    console.log(`Languages Detected: ${results.languages.join(', ')}`);
    console.log(`Primary Language: ${results.language}`);

    console.log('\n📈 Findings Summary:');
    console.log(`  Total Findings: ${results.summary.totalFindings}`);
    console.log(`  Critical: ${results.summary.criticalCount}`);
    console.log(`  High: ${results.summary.highCount}`);
    console.log(`  Medium: ${results.summary.mediumCount}`);
    console.log(`  Low: ${results.summary.lowCount}`);
    console.log(`  Info: ${results.summary.infoCount}`);
    console.log(`  Categories: ${results.summary.categoriesFound.join(', ')}`);

    // Group findings by language
    const findingsByLanguage = {};
    const findingsByCategory = {};

    results.findings.forEach((finding) => {
      // Extract language from file path
      const filePath = finding.filePath;
      let language = 'unknown';
      
      if (filePath.includes('/javascript/') || filePath.includes('/typescript/')) {
        language = filePath.includes('/typescript/') ? 'typescript' : 'javascript';
      } else if (filePath.includes('/python/')) {
        language = 'python';
      } else if (filePath.includes('/java/')) {
        language = 'java';
      } else if (filePath.includes('/csharp/')) {
        language = 'csharp';
      } else if (filePath.includes('/php/')) {
        language = 'php';
      } else if (filePath.includes('/go/')) {
        language = 'go';
      } else if (filePath.includes('/ruby/')) {
        language = 'ruby';
      } else if (filePath.includes('/cpp/')) {
        language = 'cpp';
      } else if (filePath.includes('/rust/')) {
        language = 'rust';
      } else if (filePath.includes('/kotlin/')) {
        language = 'kotlin';
      } else if (filePath.includes('/swift/')) {
        language = 'swift';
      }

      if (!findingsByLanguage[language]) {
        findingsByLanguage[language] = [];
      }
      findingsByLanguage[language].push(finding);

      // Group by category
      const category = finding.category || 'unknown';
      if (!findingsByCategory[category]) {
        findingsByCategory[category] = [];
      }
      findingsByCategory[category].push(finding);
    });

    // Display findings by language
    console.log('\n' + '='.repeat(60));
    console.log('🌐 FINDINGS BY LANGUAGE');
    console.log('='.repeat(60));
    Object.keys(findingsByLanguage)
      .sort()
      .forEach((lang) => {
        const count = findingsByLanguage[lang].length;
        const severities = {
          critical: findingsByLanguage[lang].filter((f) => f.severity === 'critical').length,
          high: findingsByLanguage[lang].filter((f) => f.severity === 'high').length,
          medium: findingsByLanguage[lang].filter((f) => f.severity === 'medium').length,
          low: findingsByLanguage[lang].filter((f) => f.severity === 'low').length,
        };
        console.log(`\n${lang.toUpperCase()}:`);
        console.log(`  Total: ${count}`);
        console.log(`  Critical: ${severities.critical}, High: ${severities.high}, Medium: ${severities.medium}, Low: ${severities.low}`);
      });

    // Display findings by category
    console.log('\n' + '='.repeat(60));
    console.log('🔍 FINDINGS BY CATEGORY');
    console.log('='.repeat(60));
    Object.keys(findingsByCategory)
      .sort()
      .forEach((category) => {
        const count = findingsByCategory[category].length;
        console.log(`\n${category}: ${count} findings`);
      });

    // Display sample findings
    console.log('\n' + '='.repeat(60));
    console.log('📋 SAMPLE FINDINGS (First 10)');
    console.log('='.repeat(60));
    results.findings.slice(0, 10).forEach((finding, index) => {
      console.log(`\n${index + 1}. [${finding.severity.toUpperCase()}] ${finding.category}`);
      console.log(`   File: ${finding.filePath}`);
      console.log(`   Line: ${finding.lineNumber}`);
      console.log(`   Message: ${finding.message}`);
      if (finding.codeSnippet) {
        console.log(`   Code: ${finding.codeSnippet.substring(0, 100)}...`);
      }
    });

    // Test validation
    console.log('\n' + '='.repeat(60));
    console.log('✅ TEST VALIDATION');
    console.log('='.repeat(60));

    const expectedLanguages = [
      'javascript',
      'typescript',
      'python',
      'java',
      'csharp',
      'php',
      'go',
      'ruby',
      'cpp',
      'rust',
      'kotlin',
      'swift',
    ];

    const detectedLanguages = results.languages.map((l) => l.toLowerCase());
    const missingLanguages = expectedLanguages.filter(
      (lang) => !detectedLanguages.includes(lang)
    );

    if (missingLanguages.length > 0) {
      console.log(`⚠️  Missing languages: ${missingLanguages.join(', ')}`);
    } else {
      console.log('✅ All expected languages detected');
    }

    if (results.summary.totalFindings > 0) {
      console.log('✅ Scanner detected vulnerabilities');
    } else {
      console.log('⚠️  No vulnerabilities detected - may need rule configuration');
    }

    // Expected vulnerability types
    const expectedCategories = [
      'injection',
      'xss',
      'hardcoded secrets',
      'command injection',
      'path traversal',
    ];

    const foundCategories = results.summary.categoriesFound.map((c) =>
      c.toLowerCase()
    );
    const missingCategories = expectedCategories.filter(
      (cat) => !foundCategories.some((fc) => fc.includes(cat))
    );

    if (missingCategories.length > 0) {
      console.log(
        `⚠️  Expected categories not found: ${missingCategories.join(', ')}`
      );
    } else {
      console.log('✅ Expected vulnerability categories detected');
    }

    console.log('\n' + '='.repeat(60));
    console.log('✨ Test completed successfully!');
    console.log('='.repeat(60) + '\n');

    return results;
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run tests if executed directly
if (require.main === module) {
  runTests()
    .then(() => {
      process.exit(0);
    })
    .catch((error) => {
      console.error('Fatal error:', error);
      process.exit(1);
    });
}

module.exports = { runTests };

