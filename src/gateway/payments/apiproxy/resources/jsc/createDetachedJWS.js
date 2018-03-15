var detachedJws = context.getVariable("detachedJws");
detachedJws = detachedJws.split(".");
detachedJws = detachedJws[0] + ".."+ detachedJws[2];
context.setVariable("detachedJws",detachedJws);