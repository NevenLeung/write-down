## Frequently asked questions

### Why the photo search feature fails in my local development?

I use the [Unsplash API](https://github.com/unsplash/unsplash-js) to do the photo search. If you want to use this feature in your development, you need to register an account in [Unsplash Developer](https://unsplash.com/developers) first. The setting is in the [unsplash-service.js](https://github.com/NevenLeung/write-down/blob/master/src/utils/external/unsplash-service.js).

Here is a useful [guidelines of Unsplash API](https://medium.com/unsplash/unsplash-api-guidelines-28e0216e6daa) for you to check which code you might need to change.

### Why Write Down isn't friendly to mobile device and wide screen monitor?

For mobile device:

At the beginning, Write Down is aimed at being a web app.

For example, I made the display mode toggling feature in the article editing page by using transition on width property. If I used responsive design on Write Down, two panels, editor and preview, should be stacked up instead of laying horizontally. The display mode toggling feature should change the high of panel instead of width. It's difficult problem for me.

In addition, the buttons in the header also need to totally re-design to fit the using preference of mobile device.

For wide screen monitor:

I used my laptop to develop Write Down. I don't have such a wide screen monitor to let me test it and improve the styling. Maybe I will make it sooner or later.

### Why Write Down only supports local storage?

I don't want to maintain a backend server to do the storage, so local storage is enough for data storage.

 However, it is a problem that only you can see the articles you wrote. If you want to use Write Down to develop your blog system, you can change the code in the ducks file, which mostly are some async actions.