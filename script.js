const butInstall = document.getElementById('butInstall');
const divInstall = document.getElementById('installContainer');
const divInstallMessage = document.getElementById('installContainerMessage');
      
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js', {
          scope: './',
        });
      }
      
      /*
        Listen beforeinstallprompt prompt
        Save this event prompt for later
        Let the user know that this app is installable as a PWA and they can then click on the custom install button to start the installation flow.
      */
    window.addEventListener('beforeinstallprompt', (event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
          
      console.log('👍', 'beforeinstallprompt', event); //Would the beforeinstallprompt event be triggered in IOS ?
      // Stash the event so it can be triggered later.
      window.deferredPrompt = event;
      // Remove the 'hidden' class from the install button container
      divInstall.classList.toggle('hidden', false);
      divInstallMessage.classList.toggle('hidden', true);
    });
            
      /*
       Next step is to listen to the click event of the install prompt and install the app. This is where the saved beforeinstallprompt event needs to be triggered,
       so we go back, pick it up and use it inside the event handler of this click of the prompt.
       The most interesting thing here with this custom A2HS in our web app that I find is the flexible usage of the prompt,
       we can show this prompt as a snack bar, tooltip, or a small button or a tab somewhere in the app, totally as per users’s choice.
       Doesn’t necessarily need to be a button as Add to home screen like we saw above.
       */
      butInstall.addEventListener('click', async () => {
        console.log('👍', 'butInstall-clicked');
        const promptEvent = window.deferredPrompt;
        if (!promptEvent) {
          // The deferred prompt isn't available.
          return;
        }
        // Show the install prompt.
        promptEvent.prompt();
        // Log the result
        const result = await promptEvent.userChoice;
        console.log('👍', 'userChoice', result);
        // Reset the deferred prompt variable, since
        // prompt() can only be called once.
        window.deferredPrompt = null;
        // Hide the install button.
        divInstall.classList.toggle('hidden', true);
      });
            /*
      Installing a Progressive Web App through an install button is only one way users can install a PWA.
      They can also use Chrome's menu, the mini-infobar, and through an icon in the omnibox.
      You can track all of these ways of installation by listening for the appinstalled event.
      */
      window.addEventListener('appinstalled', (event) => {
        console.log('👍', 'appinstalled', event);
        // Clear the deferredPrompt so it can be garbage collected
        window.deferredPrompt = null;
      });
