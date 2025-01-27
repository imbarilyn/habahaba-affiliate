

export const shareToSocials = (social: string, link: string) => {
  const encodedSocial = encodeURIComponent(social)
  let shareUrl = ''
  const emailSubject = encodeURIComponent('Habahaba App')
  const message =  encodeURIComponent(`💫 Start saving smarter with Habahaba App! 🌟  Your journey to financial freedom begins here. Download now:  ${link}. \nWatch your savings grow effortlessly! 💰`)
  if(social === 'facebook'){
    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedSocial}&quote=${message}`
  }
  if(social === 'twitter'){
   shareUrl = `https://twitter.com/intent/tweet?url=${encodedSocial}&text=${message}`
  }
  if(social === 'whatsapp'){
    shareUrl = `https://wa.me/?text=${message}`
  }
  if(social === 'email'){
    shareUrl = `mailto:?subject=${emailSubject}&body=${message}`
  }
  if(social === 'linkedin'){
   shareUrl =  `https://www.linkedin.com/sharing/share-offsite/?url=${encodedSocial}`
  }
  window.open(shareUrl, '_blank')
}
