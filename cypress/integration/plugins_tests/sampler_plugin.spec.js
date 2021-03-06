import TableTile from "../../support/elements/TableTile";
import CodapObject from "../../support/elements/CodapObject";
import CfmObject from "../../support/elements/CfmObject";

const table = new TableTile;
const codap = new CodapObject;
const cfm = new CfmObject;

const baseUrl = `${Cypress.config("baseUrl")}`;

describe('Sampler plugin', function () {
  before(() => {
    cy.visit(baseUrl);
    cfm.createNewDocument();
    codap.openTile('plugin', 'Sampler')
    cy.wait(2000)
    //run sampler
    cy.getPluginIframe().find('#speed').type(3 + '{enter}')
    cy.getPluginIframe().find('#run').click()
    cy.wait(10000)
  })
  it('verify data is shown in table', function () {
    table.getCollection().eq(0).within(() => {
      table.getCell(1, 1, 0).find('.dg-numeric').should('contain', 1)
      // table.getCell(2,2,0).find('.dg-numeric').should('contain',this.mass)
    })
    table.getCollection().eq(1).within(function () {
      table.getCell(1, 1, 0).find('.dg-numeric').should('contain', 1)
    })
    table.getCollection().eq(2).within(function () {
      table.getCell(1, 1, 0).find('.dg-numeric').should('not.contain', '')
    })
  })
})