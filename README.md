[![Build Status](https://api.shippable.com/projects/55349138edd7f2c052c8a648/badge?branchName=master)](https://app.shippable.com/projects/55349138edd7f2c052c8a648/builds/latest)

# status
This is our new mvp, as Victor said it, i think it has the lowest path of resistence to get our feet in the door of the hospital and show our brand.

#what is it
Every single hospital floor has a bed status board. The purpose of this board is to allow the health care team, that is Doctor, Nurse, Charge Nurese, CNA (certified nurse assistants), unit secretary to know these things:
<ul>
<li>The availibity of each room on the floor.</li>
<li>The code status (what to do if this patient is dieing, can we do CPR, or do we DNR -- do not recessitate).</li>
<li>The registered nurse responsibile for this patient.</li>
<li>The doctor responsible for this patient.</li>
<li>The CNA responsible for this patient.</li>
<li>The Room number this patient is.</li>
<li>What isloations(certain diseases are so bad that they need to be isolated to prevent the spread of infection. ex Tuberculosis)</li>
</ul>

# Goals
<ul>
  <li>Replace this hand written bed staus board, with a digital version whos primary function is simplicity. Simple to edit. Clear to understand</li>
</ul>
#Streach Goals
<ul>
  <li>Change some status based on alarms, maybe getting input from some sensor.</li>
</ul>

```bash
docker stop $(docker ps -a -q) && docker rm $(docker ps -a -q) && docker rmi build && docker build -t "build" . && docker run -p 3000:8080 -i -t build
```
