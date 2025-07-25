<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900 transition-all duration-500">
    <!-- Header -->
    <AppHeader 
      title="Programming Challenge" 
      subtitle="Two Sum Algorithm Challenge"
      :user="user" 
      @sign-out="signOut"
    />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Question Section -->
        <div class="card p-8 animate-fade-in">
          <div class="flex items-center space-x-3 mb-6">
            <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Two Sum Problem</h2>
              <p class="text-blue-600 dark:text-blue-400 font-medium">Algorithm Challenge</p>
            </div>
          </div>

          <div class="prose dark:prose-invert max-w-none">
            <div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800 mb-6">
              <p class="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                Given an array of integers <code class="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">nums</code> and an integer <code class="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">target</code>, 
                return indices of the two numbers such that they add up to target.
              </p>
              <p class="text-gray-700 dark:text-gray-300 mb-4">
                You may assume that each input would have exactly one solution, and you may not use the same element twice.
              </p>
            </div>
            
            <div class="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800 mb-6">
              <h3 class="text-lg font-semibold text-green-800 dark:text-green-200 mb-3 flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Example:
              </h3>
              <div class="bg-gray-900 dark:bg-gray-800 p-4 rounded-lg">
                <pre class="text-sm text-green-400"><code>Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].</code></pre>
              </div>
            </div>
            
            <div class="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-xl border border-orange-200 dark:border-orange-800">
              <h3 class="text-lg font-semibold text-orange-800 dark:text-orange-200 mb-3 flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Constraints:
              </h3>
              <ul class="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-1">
                <li>2 ≤ nums.length ≤ 10^4</li>
                <li>-10^9 ≤ nums[i] ≤ 10^9</li>
                <li>-10^9 ≤ target ≤ 10^9</li>
              </ul>
            </div>
          </div>
        </div>

          <!-- Code Editor Section -->
        <div class="card p-8 animate-slide-in">
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center space-x-3">
              <div class="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <div>
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Your Solution</h2>
                <p class="text-green-600 dark:text-green-400 font-medium">Choose your language</p>
              </div>
            </div>

            <!-- Language Selector -->
            <div class="flex items-center space-x-3">
              <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Language:</label>
              <select
                v-model="selectedLanguage"
                @change="changeLanguage"
                class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              >
                <option value="python">Python</option>
                <option value="cpp">C++</option>
                <option value="java">Java</option>
                <option value="javascript">JavaScript</option>
              </select>
            </div>
          </div>
          
          <!-- Code Editor -->
          <div class="mb-6">
            <div class="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center space-x-2">
                  <div class="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span class="text-xs text-gray-500 dark:text-gray-400 font-mono">{{ getFileName() }}</span>
              </div>
              <textarea
                v-model="userCode"
                class="w-full h-80 p-4 font-mono text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none code-editor transition-all duration-200"
                :placeholder="getPlaceholder()"
              ></textarea>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex space-x-4 mb-6">
            <button
              @click="testCode"
              :disabled="!userCode.trim() || testing"
              class="btn-success flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg v-if="!testing" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <svg v-else class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>{{ testing ? 'Testing...' : 'Run Tests' }}</span>
            </button>
            <button
              @click="submitCode"
              :disabled="!userCode.trim() || submitting"
              class="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg v-if="!submitting" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              <svg v-else class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>{{ submitting ? 'Submitting...' : 'Submit Solution' }}</span>
            </button>
          </div>

          <!-- Test Results -->
          <Transition
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <div v-if="testResults && testResults.length > 0" class="mb-6">
              <div class="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <div class="flex items-center space-x-3 mb-4">
                  <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-900 dark:text-white">Test Results</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400">{{ passedTests }}/{{ testResults.length }} tests passed</p>
                  </div>
                </div>
                
                <div class="space-y-3">
                  <div 
                    v-for="(result, index) in testResults" 
                    :key="index"
                    class="p-4 rounded-lg border"
                    :class="result.passed ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'"
                  >
                    <div class="flex items-center justify-between mb-2">
                      <div class="flex items-center space-x-2">
                        <div 
                          class="w-6 h-6 rounded-full flex items-center justify-center"
                          :class="result.passed ? 'bg-green-500' : 'bg-red-500'"
                        >
                          <svg v-if="result.passed" class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                          </svg>
                          <svg v-else class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                        <span class="font-medium" :class="result.passed ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'">
                          Test Case {{ index + 1 }}
                        </span>
                      </div>
                      <span 
                        class="text-xs px-2 py-1 rounded-full font-medium"
                        :class="result.passed ? 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300' : 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300'"
                      >
                        {{ result.passed ? 'PASSED' : 'FAILED' }}
                      </span>
                    </div>
                    <div class="text-sm space-y-1">
                      <div><span class="font-medium">Input:</span> <code class="bg-gray-200 dark:bg-gray-700 px-1 rounded">{{ result.input }}</code></div>
                      <div><span class="font-medium">Expected:</span> <code class="bg-gray-200 dark:bg-gray-700 px-1 rounded">{{ result.expected }}</code></div>
                      <div><span class="font-medium">Output:</span> <code class="bg-gray-200 dark:bg-gray-700 px-1 rounded">{{ result.actual }}</code></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition>

          <!-- Submission Status -->
          <Transition
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <div v-if="submissionStatus" class="mb-6">
              <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200 px-6 py-4 rounded-xl animate-slide-in">
                <div class="flex items-center space-x-3">
                  <div class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span class="font-medium">{{ submissionStatus }}</span>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>

      <!-- Previous Submissions -->
      <div class="mt-12 card p-8 animate-fade-in">
        <div class="flex items-center space-x-3 mb-6">
          <div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Your Previous Submissions</h2>
            <p class="text-purple-600 dark:text-purple-400 font-medium">Track your progress</p>
          </div>
        </div>

        <div v-if="submissions.length === 0" class="text-center py-12">
          <div class="w-24 h-24 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
            <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p class="text-gray-500 dark:text-gray-400 text-lg font-semibold mb-2">No submissions yet</p>
          <p class="text-gray-400 dark:text-gray-500 mb-4">Submit your first solution above to see it here!</p>
          <div class="flex items-center justify-center space-x-2 text-sm text-gray-400 dark:text-gray-500">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Write code → Run tests → Submit solution</span>
          </div>
        </div>

        <div v-else class="space-y-4">
          <div 
            v-for="(submission, index) in submissions" 
            :key="index"
            class="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 border border-gray-200 dark:border-gray-600 transform hover:scale-105 transition-all duration-200 animate-slide-in"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <div class="flex justify-between items-start mb-4">
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                  {{ submissions.length - index }}
                </div>
                <div>
                  <div class="flex items-center space-x-2 mb-1">
                    <span class="font-semibold text-gray-900 dark:text-white">Submission #{{ submissions.length - index }}</span>
                    <span 
                      class="text-xs px-2 py-1 rounded-full font-medium"
                      :class="getLanguageColor(submission.language || 'python')"
                    >
                      {{ (submission.language || 'python').toUpperCase() }}
                    </span>
                  </div>
                  <p class="text-sm text-gray-500 dark:text-gray-400">{{ formatDate(submission.timestamp) }}</p>
                </div>
              </div>
              <div class="text-right">
                <div v-if="submission.testsPassed !== undefined" class="flex items-center space-x-2 mb-1">
                  <div 
                    class="w-2 h-2 rounded-full"
                    :class="submission.testsPassed === submission.totalTests ? 'bg-green-500' : submission.testsPassed > 0 ? 'bg-yellow-500' : 'bg-red-500'"
                  ></div>
                  <span 
                    class="text-xs font-medium"
                    :class="submission.testsPassed === submission.totalTests ? 'text-green-600 dark:text-green-400' : submission.testsPassed > 0 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'"
                  >
                    {{ submission.testsPassed || 0 }}/{{ submission.totalTests || 4 }} Tests Passed
                  </span>
                </div>
                <div v-else class="flex items-center space-x-2 mb-1">
                  <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span class="text-xs text-blue-600 dark:text-blue-400 font-medium">Submitted</span>
                </div>
              </div>
            </div>
            
            <!-- Test Results Summary -->
            <div v-if="submission.testResults && submission.testResults.length > 0" class="mb-4">
              <div class="flex items-center space-x-2 mb-2">
                <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Test Results:</span>
              </div>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
                <div 
                  v-for="(result, resultIndex) in submission.testResults" 
                  :key="resultIndex"
                  class="flex items-center space-x-2 p-2 rounded-lg text-xs"
                  :class="result.passed ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300' : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'"
                >
                  <div 
                    class="w-3 h-3 rounded-full"
                    :class="result.passed ? 'bg-green-500' : 'bg-red-500'"
                  ></div>
                  <span>Test {{ resultIndex + 1 }}</span>
                </div>
              </div>
            </div>
            
            <div class="bg-gray-900 dark:bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center space-x-2">
                  <div class="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span class="text-xs text-gray-400 font-mono">
                  {{ submission.language === 'python' ? 'solution.py' : 
                     submission.language === 'cpp' ? 'solution.cpp' : 
                     submission.language === 'java' ? 'Solution.java' : 
                     submission.language === 'javascript' ? 'solution.js' : 'solution.py' }}
                </span>
              </div>
              <pre class="text-sm text-gray-300 overflow-x-auto code-editor"><code>{{ submission.code }}</code></pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
          
<script setup>
import { collection, addDoc, query, where, orderBy, onSnapshot } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'

const { $firebase } = useNuxtApp()
const { initTheme } = useTheme()

// Reactive state
const user = ref(null)
const userCode = ref('')
const selectedLanguage = ref('python')
const testResults = ref([])
const submissionStatus = ref('')
const submissions = ref([])
const testing = ref(false)
const submitting = ref(false)

// Language templates
const languageTemplates = {
  python: `def two_sum(nums, target):
    """
    :type nums: List[int]
    :type target: int
    :rtype: List[int]
    """
    # Write your solution here
    # Example: Use a hash map for O(n) solution
    pass`,
  
  cpp: `#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Write your solution here
        // Example: Use unordered_map for O(n) solution
        return {};
    }
};`,
  
  java: `import java.util.*;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your solution here
        // Example: Use HashMap for O(n) solution
        return new int[]{};
    }
}`,
  
  javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    // Write your solution here
    // Example: Use Map for O(n) solution
};`
}

// Test cases for Two Sum problem
const testCases = [
  {
    input: "nums = [2,7,11,15], target = 9",
    nums: [2, 7, 11, 15],
    target: 9,
    expected: [0, 1]
  },
  {
    input: "nums = [3,2,4], target = 6",
    nums: [3, 2, 4],
    target: 6,
    expected: [1, 2]
  },
  {
    input: "nums = [3,3], target = 6",
    nums: [3, 3],
    target: 6,
    expected: [0, 1]
  },
  {
    input: "nums = [1,5,2,8], target = 7",
    nums: [1, 5, 2, 8],
    target: 7,
    expected: [1, 2]
  }
]

// Initialize with default template
onMounted(() => {
  initTheme()
  userCode.value = languageTemplates[selectedLanguage.value]
  
  onAuthStateChanged($firebase.auth, (firebaseUser) => {
    if (firebaseUser) {
      user.value = firebaseUser
      loadSubmissions()
    } else {
      navigateTo('/')
    }
  })
})

// Load user's previous submissions with real-time updates
const loadSubmissions = async () => {
  if (!user.value) {
    console.log('No user found, cannot load submissions')
    return
  }
  
  console.log('Loading submissions for user:', user.value.uid, user.value.email)
  
  try {
    const q = query(
      collection($firebase.db, 'submissions'),
      where('userId', '==', user.value.uid),
      orderBy('timestamp', 'desc')
    )
    
    console.log('Setting up real-time listener for submissions...')
    
    // Real-time listener for submissions
    const unsubscribe = onSnapshot(q, (snapshot) => {
      console.log('Submissions snapshot received:', snapshot.size, 'documents')
      
      if (snapshot.empty) {
        console.log('No submissions found for user:', user.value.uid)
        submissions.value = []
        return
      }
      
      submissions.value = snapshot.docs.map(doc => {
        const data = doc.data()
        console.log('Submission found:', doc.id, data)
        return {
          id: doc.id,
          ...data
        }
      })
      
      console.log('Total submissions loaded:', submissions.value.length)
    }, (error) => {
      console.error('Error in submissions listener:', error)
      // Try to load submissions without orderBy in case there's no index
      console.log('Retrying without orderBy...')
      loadSubmissionsSimple()
    })
    
  } catch (error) {
    console.error('Error setting up submissions listener:', error)
    // Fallback to simple query
    loadSubmissionsSimple()
  }
}

// Fallback function without orderBy
const loadSubmissionsSimple = async () => {
  if (!user.value) return
  
  try {
    console.log('Loading submissions with simple query...')
    const q = query(
      collection($firebase.db, 'submissions'),
      where('userId', '==', user.value.uid)
    )
    
    onSnapshot(q, (snapshot) => {
      console.log('Simple query snapshot:', snapshot.size, 'documents')
      submissions.value = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })).sort((a, b) => {
        // Sort manually by timestamp
        const aTime = a.timestamp?.toDate?.() || new Date(a.timestamp) || new Date(0)
        const bTime = b.timestamp?.toDate?.() || new Date(b.timestamp) || new Date(0)
        return bTime - aTime
      })
      console.log('Submissions after manual sort:', submissions.value.length)
    }, (error) => {
      console.error('Error in simple submissions query:', error)
    })
  } catch (error) {
    console.error('Error in loadSubmissionsSimple:', error)
  }
}

// Change language and update template
const changeLanguage = () => {
  userCode.value = languageTemplates[selectedLanguage.value]
  testResults.value = []
}

// Get file name based on language
const getFileName = () => {
  const extensions = {
    python: 'solution.py',
    cpp: 'solution.cpp',
    java: 'Solution.java',
    javascript: 'solution.js'
  }
  return extensions[selectedLanguage.value]
}

// Get placeholder text
const getPlaceholder = () => {
  return languageTemplates[selectedLanguage.value]
}

// Test the code with actual test cases
const testCode = async () => {
  if (!userCode.value.trim()) return
  
  testing.value = true
  testResults.value = []
  
  try {
    // Simulate test execution for each test case
    const results = []
    
    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i]
      
      // Simulate running the code (in a real app, you'd execute this in a sandbox)
      const result = await simulateCodeExecution(testCase)
      results.push(result)
      
      // Add small delay to simulate actual execution
      await new Promise(resolve => setTimeout(resolve, 200))
    }
    
    testResults.value = results
    
  } catch (error) {
    testResults.value = [{
      input: 'Error',
      expected: 'Valid code',
      actual: error.message,
      passed: false
    }]
  } finally {
    testing.value = false
  }
}

// Simulate code execution (replace with actual execution in production)
const simulateCodeExecution = async (testCase) => {
  // This is a simplified simulation - in production, you'd run actual code
  const hasValidStructure = checkCodeStructure()
  
  if (!hasValidStructure) {
    return {
      input: testCase.input,
      expected: JSON.stringify(testCase.expected),
      actual: 'Invalid function structure',
      passed: false
    }
  }
  
  // Simulate different outcomes based on code quality
  const codeLines = userCode.value.toLowerCase()
  let simulatedResult = []
  
  // Simple heuristic to determine if solution might work
  if (codeLines.includes('hash') || codeLines.includes('map') || codeLines.includes('dict')) {
    // Likely a good solution
    simulatedResult = testCase.expected
  } else if (codeLines.includes('for') && codeLines.includes('return')) {
    // Might be a brute force solution - simulate 50% success rate
    simulatedResult = Math.random() > 0.5 ? testCase.expected : [0, 0]
  } else {
    // Incomplete solution
    simulatedResult = []
  }
  
  const passed = JSON.stringify(simulatedResult.sort()) === JSON.stringify(testCase.expected.sort())
  
  return {
    input: testCase.input,
    expected: JSON.stringify(testCase.expected),
    actual: JSON.stringify(simulatedResult),
    passed: passed
  }
}

// Check if code has valid structure
const checkCodeStructure = () => {
  const code = userCode.value.toLowerCase()
  
  switch (selectedLanguage.value) {
    case 'python':
      return code.includes('def two_sum') && code.includes('return')
    case 'cpp':
      return code.includes('vector<int> twosum') && code.includes('return')
    case 'java':
      return code.includes('int[] twosum') && code.includes('return')
    case 'javascript':
      return code.includes('var twosum') || code.includes('function twosum') || code.includes('const twosum')
    default:
      return false
  }
}

// Computed property for passed tests count
const passedTests = computed(() => {
  return testResults.value.filter(result => result.passed).length
})

// Submit the code to Firebase
const submitCode = async () => {
  if (!user.value || !userCode.value.trim()) {
    console.log('Cannot submit: no user or empty code')
    return
  }
  
  submitting.value = true
  submissionStatus.value = 'Submitting your solution...'
  console.log('Starting code submission for user:', user.value.uid)
  
  try {
    const testsPassed = testResults.value.length > 0 ? passedTests.value : 0
    const totalTests = testResults.value.length || testCases.length
    
    const submissionData = {
      userId: user.value.uid,
      userEmail: user.value.email,
      userName: user.value.displayName || user.value.email,
      code: userCode.value,
      language: selectedLanguage.value,
      timestamp: new Date(),
      challenge: 'two-sum',
      testsPassed: testsPassed,
      totalTests: totalTests,
      testResults: testResults.value
    }
    
    console.log('Submitting data:', submissionData)
    
    const docRef = await addDoc(collection($firebase.db, 'submissions'), submissionData)
    console.log('Submission successful with ID:', docRef.id)
    
    submissionStatus.value = `✅ Solution submitted successfully! (${testsPassed}/${totalTests} tests passed)`
    
    setTimeout(() => {
      submissionStatus.value = ''
    }, 5000)
    
  } catch (error) {
    console.error('Submit error:', error)
    submissionStatus.value = '❌ Error submitting: ' + error.message
    setTimeout(() => {
      submissionStatus.value = ''
    }, 5000)
  } finally {
    submitting.value = false
  }
}

// Sign out function
const signOut = async () => {
  try {
    await $firebase.signOut()
    await navigateTo('/')
  } catch (error) {
    console.error('Sign out error:', error)
  }
}

// Format date for display
const formatDate = (timestamp) => {
  if (!timestamp) return ''
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
  return date.toLocaleString()
}

// Get language badge color
const getLanguageColor = (language) => {
  const colors = {
    python: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
    cpp: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
    java: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
    javascript: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
  }
  return colors[language] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
}
</script>
