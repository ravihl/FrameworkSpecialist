@isTest
private class BillingCalloutServiceTest {
    @testSetup static void setup(){
        Opportunity opp = new Opportunity();
        opp.Name = 'opp01';
        opp.CloseDate = Date.today();
        opp.StageName = 'Prospecting';
        insert opp;
        
        Project__c p1 = new Project__c();
        p1.Name ='p1';
        p1.Opportunity__c = opp.Id;
        p1.ProjectRef__c = '23345';
        insert p1;
        
        Project__c p2 = new Project__c();
        p2.Name ='p1';
        p2.Opportunity__c = opp.Id;
        p2.ProjectRef__c = '233456';
        insert p2;
        
        ServiceCredentials__c servCred = new ServiceCredentials__c();
        servCred.Name = 'BillingServiceCredential';
        servCred.Username__c = 'user1';
        servCred.Password__c = 'pass1';
        insert servCred;
    }
    
  	//Implement mock callout tests here
    @isTest static void callBillingServiceSuccess(){
        Project__c p1 = [select id, Status__c  from Project__c where ProjectRef__c='23345'];
        p1.Status__c = 'Billable';

        
        Test.setMock(WebServiceMock.class, new BillingCalloutServiceMock());
        Test.startTest();
        update p1;
        Test.stopTest();
        
        p1 = [select Status__c from Project__c where ProjectRef__c = '23345'];
        System.debug('Assertion in Service Success');
        system.assertEquals('Billed', p1.Status__c);
        
    }
    
    @isTest static void callBillingServiceFailure(){
        Project__c p2 = [select id, Status__c  from Project__c where ProjectRef__c='233456'];
        p2.Status__c = 'Billable';
        
        Test.setMock(WebServiceMock.class, new BillingCalloutServiceMockFailure());
        Test.startTest();
        update p2;
        Test.stopTest();
        
        p2 = [select Status__c from Project__c where ProjectRef__c = '233456'];
        System.debug('Assertion in Service Failure');
        system.assertEquals('Billable', p2.Status__c);
    }
}