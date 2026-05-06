# Roll The Dice And Make Up My Mind
## Created By
Daniel Beifus

## Decisions
The first most import decision obviously was what to create.  Any time I learn something new or do a project to sharpen my skills, I always try to make it personal so I know it is something that I will use and take personal pride in.  The decision for making a random decision maker was something I thought about turning into a mobile app, but never found the time to get to far into learning mobile app programming in my free time.  I wanted to be able to make the decisions on my phone and when I had to come up with a website, I realized this would work well as a website.  It is something I wanted, it offered the chance to learn more Javascript and it is something I will use even after the class is over.  

The next big decision was how to do the random choice and make it animated enough to show the user that something is happening to give it a little more flare than a simple "Here is your choice.  Trust me that it was random even though you didn't see anything".  So I decided to make the list shuffle, which includes empty line clean up. The rolling included color change to show  the progress and 50 shuffles.  Then to make the final choice, a random line is chosen from the shuffled list.  This uses multiple random choices to really make it random.

I also made a decision about how I implemented multiple lists.  I hard coded the additional lists and after reading the peer reviews, I realized it provided clutter unless the user wanted extra lists.  In reality, 90% of use cases will most likely be one list one.  So I made the decision to scrap the additional lists and only provide them when they are desired.  I added an add and remove button to make the lists appear and disappear while ensuring there is always a minimum of one list on the screen.  I experimented with several methods and finally opted for creating the new list elements on the fly using Javascript.  This does not lock the user into a set maximum number of lists.  

There were a lot of little decisions that went into this, but these feel like the most note-worthy.

## What Worked
The website overall worked.  I have shared it will family and friends and received a lot of positive feedback which includes my mom using it to pick a place to eat lunch today, which means it is working really well at being useful.  The fact that it choices randomly and gives a visual feedback that something is happening worked out really well.  I have not had to make any code updates to the random part of it since the first MVP.  I think the choice in deployment sites is working out really well.  I do plan to eventually pay for a site, but now I know where to host a site for proofing purposes and how to link it to a repository for easy deployment.  The linking of Github to my desktop using Github Desktop was alot easier than I thought and made the act of making changes and pushing them to the repository alot easier.

## What I Would Do Differently
Most of what I will cover here is more aptly called, what do I plan to implement at a later iteration because I plan to keep using this site and what I would do differently is my tasking backlog for future improvements.  

1. I want to add the ability to change the titles of the lists.  I plan to use this when running table top games and naming the lists just makes sense to reduce confusion.  
2.  I also want to add a button to roll all lists at once while keeping the individual rolling intact.  
3.  I also would like to add a import previous session button where the number of import files defines the number of lists and update the titles and the list contents.  
4.  I would also like to supply a URL argument to load the lists upon page load.  
5.  I also want to add the ability to do the above changes from one single JSON file.
6. I would also like to make the some buttons that can roll whatever sided die the user selects. 

These are the current backlog items, but I am sure I will come up with more as I get more use out it and more feedback.

## What I Learned
I learned that not every browser can run the same methods.  I had to put some conditional statements to handle certain parts of the code differently.  I learned that pushing an update and deploying the upload can be done seamlessly with the right setup.  I also learned that making the page update based on a change is not always straight forward.  Finally, I learned that I can make major updates even when I am not 100% sure of the way forward by trying over and over until I find a solution that I like.  Sometimes the solution is to realize a typo is keeping your CSS from being applied.

