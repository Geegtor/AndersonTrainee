
const empty = {};
const test = {
        name: "Jhon", 
        bag: {
            componets: 'coke', 
            tasks: {
                toDo: 3, 
                toDoList: {list: 'OMFG'}
            }
        },
        isAdmin: true, 
        isUser: false, 
        bird: "crow",         
    };

const rtrn = copyObjDeep(test);

describe("Initial check object Type", function() {  
    it(`Should be object type`, function() {
        assert.equal(typeof( copyObjDeep() ), 'object');
        });
});

describe("Object and result with different Link", function() {
    it(`Should have different links`, function() {
        assert.equal(test !== copyObjDeep(), true);
    });
});
 
describe("Result with compareObjDeep function should be true", function() {     
    it(`Object properties should have different links and the same value`, function() {
                    assert.equal(compareObjDeep(test), true);
                });
}); 