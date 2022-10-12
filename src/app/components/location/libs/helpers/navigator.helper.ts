export default class NavigatorHelper{
    static getLocation(): Promise<any>{

        return new Promise((resolve,reject) => {
            navigator.geolocation.getCurrentPosition(pos =>{
                resolve(pos);
            },
            error =>{
                reject(error)
            })
        })

        

       /* navigator.geolocation.getCurrentPosition(pos =>{
            Promise.resolve(pos);
        },
        error =>{
            Promise.reject(error)
        })*/
    }

    static getLocationCallBack(success: (key: any) => void,error: (key: any) => void){
        navigator.geolocation.getCurrentPosition(pos => {
            success(pos)
        },
        err => {
            error(err)
        })
    }

    static startRecord(video: HTMLVideoElement){
        navigator.mediaDevices.getUserMedia(
          {
            video: {
              width: 800,
              height: 600,
              /*deviceId: {
                exact: ''
              }*/
            },
            //audio: true
          }
        ).then(media => {
          video.srcObject = media;
          video.onloadedmetadata = resp => {
            video.play();
            let data: any[] = []
            const record = new MediaRecorder(media, {mimeType: 'video/webm'})
            record.ondataavailable = eve => { data.push(eve.data);}
            record.onstop = () => {
              const blob = new Blob(data, {
                type: 'video/webm'
              })
              /*const reader = new FileReader();
              reader*/
              const url = URL.createObjectURL(blob)
              const elA = document.createElement('a')
              document.body.appendChild(elA)
              elA.href = url;
              elA.download = 'video.webm';
              elA.click()
            }
    
            setTimeout(()=> {
              record.start()
            },100)
            setTimeout(() =>{
                record.stop()
            },3000)
          }
        })
      }

    static getDevices(){
        navigator.mediaDevices.enumerateDevices()
        .then(response =>{
            response.forEach(item => {
                if(item.kind == 'videoinput')console.log(item)
            })
        })
    }

    static startAudio(audio: HTMLAudioElement){
        navigator.mediaDevices.getUserMedia({
            audio: true
        }).then(media => {
            audio.srcObject = media;
            audio.onloadedmetadata = resp => {
                audio.play();
                let data: any[] = []
                const record = new MediaRecorder(media, {mimeType: 'audio/webm'})
                record.ondataavailable = eve => { data.push(eve.data);}
                record.onstop = () => {
                    const blob = new Blob(data, {
                      type: 'audio/webm'
                    })
                    const url = URL.createObjectURL(blob)
                    const elA = document.createElement('a')
                    document.body.appendChild(elA)
                    elA.href = url;
                    elA.download = 'audio.webm';
                    elA.click()
                }

                setTimeout(()=> {
                    record.start()
                },100);
                setTimeout(() =>{
                    record.stop()
                },3000);
            }
        })
    }
}