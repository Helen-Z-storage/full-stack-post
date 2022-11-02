Part 3: Written Evaluation
Lastly, please provide a markdown file with the answers to the following questions below.

The product team has decided that we want to make a change to this application such that authors of a blog post can have different roles:

Authors can be owners, editors, or viewers of a blog post. For any blog post, there must always be at least one owner of the blog post. Only owners of a blog post can modify the authors' list to a blog post (adding more authors, changing their role).

Questions:
What database changes would be required to the starter code to allow for different roles for authors of a blog post? Imagine that we’d want to also be able to add custom roles and change the permission sets for certain roles on the fly without any code changes.
How would you have to change the PATCH route given your answer above to handle roles?

Database changes:
1. adding new table in ../db/models file named Role and contain unique name and permission indicators as columns.
   - permissions are reading, adding, delete and update following: 
       - author list, authors' role, post text, likes, reads, popularity, tags.
   - adding new row can adding custom role.
   - update row can changing permission set.
2. adding new column called roleId in UserPost table.
   - indicate the role of userId on postId.
   - when adding new Post, the roleId is always indicate as "Owner".
   - every user on every single post will have exactly one role, keep this constraint by
       a. make (userId, postId) be unique and
       b. make roleId be non-null
   - every post will have at least one "Owner" role, keep this constaint by using 
       - when doing insert on specific postId, check following in order: 
            a. whether current roleId is "Owner"'s id, if so, insert anyway
            b. whether exist (postId, "Owner"'s id) pair, if so, insert anyway
            c. error for any other cases
       - when doing delete on specific postId, check following in order:
            a. whether current roleId is "Owner"'s id, if not, delete anyway
            b. whether exist other (postId, "Owner"'s id) pair or there's no other (postId) pair, if so, delete anyway
            c. error for any other cases
       - when doing update on specific postId, check following in order:
            a. whether old roleId need to update is not "Owner"'s id, if so, update anyway
            b. whether exist other (postId, "Owner"'s id) pair, if so, update anyway
            c. error for any other cases

PATCH change:
1. change request body's authorId variable to object with format {roleName: list of authorId}.
2. at the beginning, check whether current logged user is author of current post and with role "Owner".
    - if not, return "current logged user is not Owner of post" error
3. after check type validation of authorId, check whether authorId contain key Owner in it.
    - if not, return "at least one Owner in post" error
4. extract a list of all authorId in object authorId, name as newAuthorList, and also find the origianl author list from UserPost and name it as oldAuthorList.
    - find author id in oldAuthorList and not in newAuthorList: delete them from UserPost
    - find author id in newAuthorList and not in oldAuthorList: add them to UserPost
    - find author id in both newAuthorList and oldAuthorList but with different role: update them to UserPost
5. others are same as before