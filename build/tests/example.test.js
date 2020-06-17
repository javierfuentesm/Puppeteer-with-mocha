'use strict'

var _puppeteer = require('puppeteer')

var _puppeteer2 = _interopRequireDefault(_puppeteer)

var _mochaSteps = require('mocha-steps')

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj }
}

describe('Config test', function () {
	var browser = void 0,
		page = void 0
	before(async function () {
		browser = await _puppeteer2.default.launch({ headless: true })
		page = await browser.newPage()
		await page.setDefaultTimeout(7000)
	})
	after(async function () {
		await browser.close()
	})
	it('should work', function () {
		console.log('Working')
	})
	;(0, _mochaSteps.step)('should load google homepage', async function () {
		await page.goto('https://google.com')
	})
	;(0, _mochaSteps.step)('step 2 should fail', async function () {
		throw new Error()
	})
	;(0, _mochaSteps.step)('step 3', async function () {
		console.log('step 3')
	})
})
