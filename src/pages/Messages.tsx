import { useEffect, useState } from "react";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  MessageCircle, Send, Search, Image, Camera, 
  CheckCircle, Clock, ArrowLeft, User
} from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

interface Conversation {
  id: string;
  otherParticipant: {
    id: string;
    first_name: string | null;
    avatar_url: string | null;
  } | null;
  lastMessage: {
    content: string;
    created_at: string;
    read: boolean;
    sender_id: string;
  } | null;
  unreadCount: number;
}

const Messages = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation.otherParticipant?.id || '');
    }
  }, [selectedConversation]);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/auth');
      return;
    }
    setCurrentUserId(session.user.id);
    fetchConversations(session.user.id);
  };

  const fetchConversations = async (userId: string) => {
    try {
      // Fetch messages where user is sender or receiver
      const { data: messagesData, error } = await supabase
        .from('messages')
        .select('*')
        .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (!messagesData || messagesData.length === 0) {
        setConversations([]);
        setLoading(false);
        return;
      }

      // Group messages by conversation (other participant)
      const conversationMap = new Map<string, any[]>();
      messagesData.forEach(msg => {
        const otherId = msg.sender_id === userId ? msg.receiver_id : msg.sender_id;
        if (!conversationMap.has(otherId)) {
          conversationMap.set(otherId, []);
        }
        conversationMap.get(otherId)!.push(msg);
      });

      // Get participant profiles
      const otherIds = Array.from(conversationMap.keys());
      const { data: participantsData } = await supabase
        .from('profiles')
        .select('id, first_name, avatar_url')
        .in('id', otherIds);

      const participantMap = new Map(participantsData?.map(p => [p.id, p]) || []);

      // Build conversations array
      const convs: Conversation[] = Array.from(conversationMap.entries()).map(([otherId, msgs]) => {
        const lastMessage = msgs[0];
        const unreadCount = msgs.filter(m => m.receiver_id === userId && !m.read).length;
        
        return {
          id: otherId,
          otherParticipant: participantMap.get(otherId) || null,
          lastMessage: lastMessage ? {
            content: lastMessage.content,
            created_at: lastMessage.created_at,
            read: lastMessage.read,
            sender_id: lastMessage.sender_id
          } : null,
          unreadCount
        };
      });

      setConversations(convs);
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (otherUserId: string) => {
    if (!currentUserId) return;
    
    try {
      const { data: messagesData, error } = await supabase
        .from('messages')
        .select('*')
        .or(`and(sender_id.eq.${currentUserId},receiver_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},receiver_id.eq.${currentUserId})`)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(messagesData || []);

      // Mark messages as read
      await supabase
        .from('messages')
        .update({ read: true })
        .eq('receiver_id', currentUserId)
        .eq('sender_id', otherUserId);
        
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation || !currentUserId) return;

    setSendingMessage(true);
    try {
      const { error } = await supabase
        .from('messages')
        .insert({
          sender_id: currentUserId,
          receiver_id: selectedConversation.otherParticipant?.id || '',
          content: newMessage.trim()
        });

      if (error) throw error;

      setNewMessage('');
      fetchMessages(selectedConversation.otherParticipant?.id || '');

    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setSendingMessage(false);
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.otherParticipant?.first_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-24">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-24">
        <h1 className="text-4xl font-bold mb-8">Mes Messages</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[600px]">
          {/* Conversations List */}
          <Card className="md:col-span-1">
            <CardHeader className="pb-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Rechercher..." 
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[500px]">
                {filteredConversations.length === 0 ? (
                  <div className="text-center py-12 px-4">
                    <MessageCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                    <p className="text-muted-foreground">Aucune conversation</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Vos conversations avec les promeneurs apparaîtront ici
                    </p>
                  </div>
                ) : (
                  <div className="divide-y">
                    {filteredConversations.map(conv => (
                      <div
                        key={conv.id}
                        className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors ${
                          selectedConversation?.id === conv.id ? 'bg-muted' : ''
                        }`}
                        onClick={() => setSelectedConversation(conv)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                              {conv.otherParticipant?.avatar_url ? (
                                <img 
                                  src={conv.otherParticipant.avatar_url} 
                                  alt="" 
                                  className="h-full w-full rounded-full object-cover" 
                                />
                              ) : (
                                <User className="h-6 w-6 text-primary" />
                              )}
                            </div>
                            {conv.unreadCount > 0 && (
                              <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                {conv.unreadCount}
                              </span>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className={`font-semibold truncate ${conv.unreadCount > 0 ? 'text-foreground' : ''}`}>
                                {conv.otherParticipant?.first_name || 'Utilisateur'}
                              </p>
                              {conv.lastMessage && (
                                <span className="text-xs text-muted-foreground">
                                  {new Date(conv.lastMessage.created_at).toLocaleDateString('fr-FR', {
                                    day: 'numeric',
                                    month: 'short'
                                  })}
                                </span>
                              )}
                            </div>
                            {conv.lastMessage && (
                              <p className={`text-sm truncate ${
                                conv.unreadCount > 0 ? 'text-foreground font-medium' : 'text-muted-foreground'
                              }`}>
                                {conv.lastMessage.sender_id === currentUserId && 'Vous: '}
                                {conv.lastMessage.content}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Messages Area */}
          <Card className="md:col-span-2 flex flex-col">
            {selectedConversation ? (
              <>
                {/* Conversation Header */}
                <CardHeader className="border-b pb-4">
                  <div className="flex items-center gap-3">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="md:hidden"
                      onClick={() => setSelectedConversation(null)}
                    >
                      <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      {selectedConversation.otherParticipant?.avatar_url ? (
                        <img 
                          src={selectedConversation.otherParticipant.avatar_url} 
                          alt="" 
                          className="h-full w-full rounded-full object-cover" 
                        />
                      ) : (
                        <User className="h-5 w-5 text-primary" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold">
                        {selectedConversation.otherParticipant?.first_name || 'Utilisateur'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        En ligne
                      </p>
                    </div>
                  </div>
                </CardHeader>

                {/* Messages */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.length === 0 ? (
                      <div className="text-center py-12 text-muted-foreground">
                        <p>Aucun message encore</p>
                        <p className="text-sm">Commencez la conversation !</p>
                      </div>
                    ) : (
                      messages.map(msg => (
                        <div
                          key={msg.id}
                          className={`flex ${msg.sender_id === currentUserId ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-[70%] ${
                            msg.sender_id === currentUserId 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-muted'
                          } rounded-2xl px-4 py-2`}>
                            <p>{msg.content}</p>
                            <div className={`flex items-center gap-1 mt-1 ${
                              msg.sender_id === currentUserId 
                                ? 'text-primary-foreground/70' 
                                : 'text-muted-foreground'
                            }`}>
                              <span className="text-xs">
                                {new Date(msg.created_at).toLocaleTimeString('fr-FR', {
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </span>
                              {msg.sender_id === currentUserId && (
                                msg.read ? (
                                  <CheckCircle className="h-3 w-3" />
                                ) : (
                                  <Clock className="h-3 w-3" />
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </ScrollArea>

                {/* Message Input */}
                <div className="p-4 border-t">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Image className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Camera className="h-5 w-5" />
                    </Button>
                    <Input
                      placeholder="Écrivez votre message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      className="flex-1"
                    />
                    <Button 
                      onClick={sendMessage} 
                      disabled={!newMessage.trim() || sendingMessage}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageCircle className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <p className="text-muted-foreground">
                    Sélectionnez une conversation pour afficher les messages
                  </p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Messages;