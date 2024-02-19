

module.exports = ( data) => {

    var admin = require("firebase-admin");

    const alreadyCreatedAps = getApps();

//var serviceAccount = require('.firebase-admin.json');
alreadyCreatedAps.length === 0
    ? admin.initializeApp({
        credential: admin.credential.cert( {
          "type": "service_account",
          "project_id": "sniperpro-a9151",
          "private_key_id": "ea3302c39b40641b54d9d20f64995fc5a6533610",
          "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCqxf2r8NaUzw16\n89QLnz+ELGIdd1KFeIOpvM5VB+jwY/BmRDv+Nu5pjcCymrT0bJY/b6XjS9AZF66+\nk3mqmSGsri3e+3RFxryE4+qlTIm/ZLli9vnuYoC2u2bUjmGndKNaKTI5kU9Ze4wO\n74Yq1MpdcDAQVTcvSVlrWYAidEP+9oa+4OwEqI0zDB+mAwMXuGR8j5F27HmhuzD1\nIYJL4mIX2kvHsoKZ0uTTUii1qKtu+0DvY4aGjAwp0vNu1h23j/MSgAq8bbP1ao3e\nVuFitZYIRGydfHRWzcLwZ0ksamFp3fhhh4CZg8uaklyENwD4u+VFZL01Drd1kYTq\nMYccrfApAgMBAAECggEABk7DLI38FF8EIR3PH+bFPSfj2obFFjJPWqj4o2IOvoz9\nHNSPCrgTXPQOwV9pflBhyadhZIsw/TGcvg6gbdFeJwyqm76EmuyDm2eiYRyknIcn\nOc/kMg6SsS0sLSmyfbGXNFtVLunTw9Bbv1Qli9Ye62NGGImtPM05b6JMqKPMEdIQ\nbNDfLCV4nWr7ZqFZoANYlBH1UxuSuHsumeC+PW2rn9enNcXb9YTTcvRfKpYVVtaf\nrSvdSa3HhSLqFxiryEWENAbRco5VHxr5j4wAsQE0Tvxl74BQIh85XudeC2Gb0PeL\ncTR0hILE9QBbvYOdsrIA/LbemtvdCeM60XBRTmvxKQKBgQDkl96omKWoCNCKlnIL\nYWBU5+6b3hBmc7/bG/CWI4Mtm7jdug7lBJuGIoEUaKYIUlWTYAVRxP2mx1M1cJe2\nkcHxqPpzrPzChKh7JGnwwCPZbn8MxOHR1mT1VuH48ON/TCH0cjKz9Y8idSSHjbEO\nc3dUGYKyji02c1wJQkL4Oqt82wKBgQC/P3pDLFlAp9fNk1ROo/sS9L1Lo+eDxMzU\nSn1oJ/VWcuaErN11CdE/jRcTtLsDUqg7b4x6iGfYNZzNFHFIzUFezsxuhCYID6n1\n+dksdPbXcUwmrZIAXe4uCR77emH0GrMouqz1bjyPgcqJZWxwDiXKWD7Bf1lfH16D\nIRQg45HUSwKBgBLRWbgBUOnDR/+QoPTE4Fw894yHPExizPFpnGWPqNXRUueV0HIT\n7gWdw4h9kOVwebD3H5j6oXLgR75HdYXG+/M72No67FfK+d+hQMNb3dehW/4eGwTe\nJFN6AoIuuluZVdY8rGXaGh1ZDVfHV0L8SF949iRixeAMoQ/2D3NFySYvAoGAHObK\n4zvggRTcWATbyMafOs4hjTzHz/H9wlc/fG4NdXMHwyUckoNZS/FWe3Pkjyv+oHzL\nDflvOA1iFNvyAr6CEoHOAyWVWcKEPNf1KfLDGuvURkQUvFl1lR9rvzVPeERQrucH\nHE/8dvN2WC0rpgN9UobjdPp51xY2gjqNgCrj7uECgYBokMWtRCUb0rJ6PvDvHufK\nWS2aq5oY646xB0u9a+oQYMGurf+kaUChOp/xC4oTq9SUSDDFFkDElbseeV5NEymv\n1vjKPtLLwqv3XS0jGlDxzy1j05nZ2KuoHiHPb0UdqJyUqsM//XUDRXnyNbUpNUOJ\nKEXuhaNbJjg0iWcnvMQBwQ==\n-----END PRIVATE KEY-----\n",
          "client_email": "firebase-adminsdk-vb67u@sniperpro-a9151.iam.gserviceaccount.com",
          "client_id": "104488749329569097409",
          "auth_uri": "https://accounts.google.com/o/oauth2/auth",
          "token_uri": "https://oauth2.googleapis.com/token",
          "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
          "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-vb67u%40sniperpro-a9151.iam.gserviceaccount.com",
          "universe_domain": "googleapis.com"
        })
      })
    : alreadyCreatedAps[0];

 


admin.messaging().sendEachForMulticast({
    tokens:data.tokens,
    data:{
        title:data.title,
        body:data.body
    }
        }).then((response)=>{
    
            console.log('ok')
        }).catch((error)=>{
            console.log('error') 
        })

}