### DON'T NEED
# module PostsHelper
#   # Our new helper method
#   def likers_of(post)
#     # votes variable is set to the likes by users.
#     votes = post.votes_for.up.by_type(User)
#     # set user_names variable as an empty array
#     user_names = []
#     # unless there are no likes, continue below.
#     unless votes.blank?
#       # iterate through the voters of each vote (the users who liked the post)
#       votes.voters.each do |voter|
#         # add the user_name as a link to the array
#         user_names.push(link_to voter.user_name,
#         profile_path(voter.user_name),
#         class: 'user-name')
#         end
#         # present the array as a nice sentence using the as_sentence method and also make it usable within our html.  Then call the like_plural method with the votes variable we set earlier as the argument.
#         user_names.to_sentence.html_safe + like_plural(votes)
#       end
#     end
#
#     def liked_post(post)
#     return 'glyphicon-heart' if current_user.voted_for? post
#     'glyphicon-heart-empty'
#   end
#
#     private
#
#     def like_plural(votes)
#       # If we more than one like for a post, use ' like this'
#       return ' like this' if votes.count > 1
#       # Otherwise, return ' likes this'
#       ' likes this'
#     end
#   end
#

module PostsHelper
  def display_likes(post)
    votes = post.votes_for.up.by_type(User)
    return list_likers(votes) if votes.size <= 8
    count_likers(votes)
  end


  def liked_post(post)
    return 'glyphicon-heart' if current_user.voted_for? post
    'glyphicon-heart-empty'
  end


  private

  def list_likers(votes)
    user_names = []
    unless votes.blank?
      votes.voters.each do |voter|
        user_names.push(link_to voter.user_name,
                                profile_path(voter.user_name),
                                class: 'user-name')
      end
      user_names.to_sentence.html_safe + like_plural(votes)
    end
  end

  def count_likers(votes)
    vote_count = votes.size
    vote_count.to_s + ' likes'
  end

  def like_plural(votes)
    return ' like this' if votes.count > 1
    ' likes this'
  end
end
