import { step } from 'mocha-steps'
import Page from '../builder'
describe('Config test', () => {
	let page
	before(async () => {
		page = await Page.build('Desktop')
	})
	after(async () => {
		await page.close()
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
