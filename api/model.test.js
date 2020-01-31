const Mons = require("./model")

const database = require("../data/dbConfig")

describe("monsters model", function () {
    it("uses testing environment", () => {
        expect(process.env.DB_ENV).toBe("testing")
    })
    describe("add()", () => {
        it("adds monsters", async () => {
            //Make a GET to /
            await Mons.add({ name: "Savage Deviljho" });
            await Mons.add({ name: "Yian Kut-Ku" });


            const monsters = await database("monsters")

            expect(monsters).toHaveLength(8);
        })
    })
    describe("remove()", () => {
        it("deletes monsters", async () => {
            await Mons.remove({ name: "Savage Deviljho" })
            await Mons.remove({ name: "Yian Kut-Ku" })

            const monsters = await database("monsters")
            expect(monsters).toHaveLength(6);
        })
    })
})