require('chromedriver');
const {Builder, By, Key, until} = require('selenium-webdriver');

const rootURL = 'https://www.donorperfect.net/prod/Logon'

 
beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build()
})
  
afterAll(async () => driver.quit())

describe("Login Function", () => {

test('initialises the context', async () => {
    await driver.get(rootURL)
  })

test('should display error message with blank user ID', async() => {
    await driver.navigate().to("https://www.donorperfect.net/prod/Logon/");
    await driver.findElement(By.id("txtUserID")).sendKeys("");
    await driver.findElement(By.id("txtPassword")).sendKeys("123");
    await driver.findElement(By.id("submit1")).click();
    await driver.findElement(By.id("divErrors")).getText().then (value => {
      console.log(value);
      expect(value).toEqual(
        expect.stringContaining("You must specify a non-blank User ID")
      );
    });
});

test('should display error message with blank password', async() => {
  await driver.navigate().to("https://www.donorperfect.net/prod/Logon/");
  await driver.findElement(By.id("txtUserID")).sendKeys("123456");
  await driver.findElement(By.id("txtPassword")).sendKeys("");
  await driver.findElement(By.id("submit1")).click();
  await driver.findElement(By.id("divErrors")).getText().then (value => {
    console.log(value);
    expect(value).toEqual(
      expect.stringContaining("You must specify a non-blank Password")
    );
  });
  
}) 

 test('should login with valid username and password', async() => {
    await driver.navigate().to("https://www.donorperfect.net/prod/Logon/");
    await driver.findElement(By.id("txtUserID")).sendKeys(""); //insert valid user id here
    await driver.findElement(By.id("txtPassword")).sendKeys("");  //insert valid password here
    await driver.findElement(By.id("submit1")).click();
    await driver.getCurrentUrl().then(value => {
      expect(value).toEqual(
         expect.stringContaining("/prod/Sidebar")
      );
    }) 
 }); 



test('should redirect with invalid user id and password', async() => {
    await driver.navigate().to("https://www.donorperfect.net/prod/Logon/");
    await driver.findElement(By.id("txtUserID")).sendKeys("notarealusername");
    await driver.findElement(By.id("txtPassword")).sendKeys("notarealpassword");
    await driver.findElement(By.id("submit1")).click();
    await driver.getCurrentUrl().then(value => {
      expect(value).toEqual(rootURL+"/Account/InvalidLogin");
    }) 
  }) 

});


describe("Reset Username or Password", () => {

  test('initialises the context', async () => {
    await driver.get(rootURL)
  })

  test('should redirect to reset password page', async() => {
    await driver.navigate().to("https://www.donorperfect.net/prod/Logon/");
    await driver.findElement(By.id("forgot_password")).click();
    await driver.getCurrentUrl().then(value => {
      expect(value).toEqual(rootURL+"/Account/PasswordReset");
    }) 
  }) 

  test('should redirect to remind user id page', async() => {
    await driver.navigate().to("https://www.donorperfect.net/prod/Logon/");
    await driver.findElement(By.id("forgot_userid")).click();
    await driver.getCurrentUrl().then(value => {
      expect(value).toEqual(rootURL+"/Account/UserIdReminder");
    }) 
  }) 

});


describe("External Links", () => {

  test('initialises the context', async () => {
    await driver.get(rootURL)
  })

  test('should redirect to rewards program page', async() => {
    await driver.navigate().to("https://www.donorperfect.net/prod/Logon/");
    await driver.findElement(By.id("logonAdLink")).click();
    await driver.getCurrentUrl().then(value => {
      expect(value).toEqual("https://www.donorperfect.com/clients/rewardsprogram/");
    }) 
  }) 


});