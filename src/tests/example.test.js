import puppeteer from 'puppeteer'
import { step } from 'mocha-steps'

describe('Config test', () => {
	let browser, page
	before(async () => {
		browser = await puppeteer.launch({ headless: true })
		page = await browser.newPage()
		await page.setDefaultTimeout(7000)
	})
	after(async () => {
		await browser.close()
	})
	it('should work', function () {
		console.log('Working')
	})
	step('should load google homepage', async () => {
		await page.goto('https://google.com')
	})
	step('step 2 should fail', async () => {
		throw new Error()
	})
	step('step 3', async () => {
		console.log('step 3')
	})
})
