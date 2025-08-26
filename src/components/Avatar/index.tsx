import React from 'react';

interface AvatarProps {
  username: string;
  imageUrl?: string;
}

const Avatar: React.FC<AvatarProps> = ({ username, imageUrl }) => {
  // Função para pegar as iniciais do nome do usuário
  const getInitials = (name: string) => {
    const names = name.split(' ');
    return names.map((n) => n[0]).join('').toUpperCase();
  };

  return (
    <div className="flex items-center p-2">
      <div className="flex-shrink-0">
        {imageUrl ? (
          <img
            className="w-12 h-12 rounded-full object-cover"
            src={imageUrl}
            alt={username}
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-green-950 flex items-center justify-center">
            <span className="text-white font-bold">
              {getInitials(username)}
            </span>
          </div>
        )}
      </div>
      
    </div>
  );
};

export default Avatar;
