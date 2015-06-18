class SuggestedTopicSerializer < ListableTopicSerializer

  attributes :archetype, :like_count, :views, :category_id, :user
  has_many :posters, serializer: TopicPosterSerializer, embed: :objects
  has_many :participants, serializer: TopicPosterSerializer, embed: :objects

  def posters
    object.posters || []
  end

  def user
    object.posters[0].user
  end

  def participants
    object.participants_summary || []
  end
end
