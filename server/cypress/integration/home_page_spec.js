describe("The Home Page", () => {
//   it("View should not change if wrong file is chosen", () => {
//     cy.visit("/"); // change URL to match your dev URL
//     cy.get('input[type="file"]').attachFile("example.json");
//     cy.get('input[type="file"]');
//   });

//   it("Upload file and copy url", () => {
//     cy.visit("/");
//     cy.get('input[type="file"]').attachFile("test.png");
//     cy.get("progress");
//     // Click copy link
//     cy.contains("Copy Link").click();
//     // Toast when link is copied
//     cy.get("div").should("contain", "Link copied");
//   });

  it("Display upload failed if image is not uploaded", () => {
    cy.visit("/");
    cy.intercept("POST", "/image", {
        statusCode: 401,
        body: "Error",
      });
    cy.get('input[type="file"]').attachFile("test.png");
    cy.get("button").should("contain", "Try Again");
  });
});
